import {useForm,} from 'react-hook-form'
import {DevTool} from '@hookform/devtools'
import * as style from '../components/tailwindUtils'
import axios from 'axios'
import {useRouter} from 'next/router'

const create_todo = () => {
    const router = useRouter();
    const form = useForm({
        defaultValues:{
              title:"",
              description:"",
              time:"",
              status:""
            }
    })

    const moment = require('moment')
    const currentDateTime = moment().format('YYYY-MM-DD T HH:mm:ss')

    
    const { register, handleSubmit, formState, control, } = form
    const { errors } = formState
    
    const Submit = async (data) => {
        const {create_todo}  = router.query;
        const id = create_todo[0]
        data.time = moment().format('YYYY-MM-DD T HH:mm:ss');
        try{
          await axios.post(`http://localhost:3001/${id}/todolist`,{
            data , id
          })
          alert('successfully created ')
          form.reset({
            title:"",
            description:"",
            time:"",
            status:""
          });
          router.push(`/${id}`)
          
        }
        catch(error){
          console.error(error)
        }
    }
    return (
        <div>
          <form action="" onSubmit={handleSubmit(Submit)} noValidate >
    
            <div className={style.bodyClass}>
              <h1 className={style.titleClass}>
                  New Todo
              </h1>
    
                <div>
                  <label htmlFor="title"  className={style.labelClass}>Title</label>
                  <input type="text" id="title" name="title" placeholder="Title"
                    className={style.inputClass}
                    {
                      ...register('title',{
                        required:'Title is mandatory',
                      })
                    } />
                    <p className={style.errorClass}>{errors.title?.message.toString()}</p>
                </div>
    
                <div>
                  <label htmlFor="description"  className={style.labelClass}>Description</label>
                  <input type="text" id="description" name="description" placeholder="Description"
                    className={style.inputClass}
                    {
                      ...register('description',{
                        required:'Description is mandatory',
                      })
                    } />
                    <p className={style.errorClass}>{errors.description?.message.toString()}</p>
                </div>

                <div>
                  <label htmlFor="time"  className={style.labelClass}>Date & Time</label>
                  <input type="text" id="time" name="time" value={currentDateTime}
                    className={style.inputClass}
                    readOnly/>
                   
              </div>

              <div>
                  <label htmlFor="status"  className={style.labelClass}>Status</label>
                  <select name="status" id="status"
                      className={style.inputClass} 
                      {...register('status',{
                      required:'Please select todo status'
                  })}>
                    <option value="In progress">In progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                <p className={style.errorClass}>{errors.status?.message.toString()}</p>
              </div>
      
              <button type='submit' className={style.buttonClass}>Add</button>            
    
            </div>
    
          </form>
            <DevTool control={control}/>
        </div>
    )
}

export default create_todo
