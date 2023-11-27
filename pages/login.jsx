import {useForm} from 'react-hook-form'
import {DevTool} from '@hookform/devtools'
import axios from 'axios'
import * as style from '../components/tailwindUtils'
import{ useRouter } from 'next/router'

const login = () => {

  const router = useRouter();

  const form = useForm({
    defaultValues:{
          email:"",
          password:""
        }
    })

  const { register, handleSubmit, formState, control } = form
  const { errors } = formState

  const onSubmit = async (data) => {
    try{
      const response = await axios.post("http://localhost:3001/",{data})
      const result = response.data.entity
      //console.log(result)
      if (result){
        const id = result.id
        router.push(`/${id}`)
        form.reset({
          email: "",
          password: "",
        });
      }
      else{
        alert('Something Wrong try again')
        form.reset({
          email: "",
          password: "",
        });
      }
    }
    catch(error){
      alert(error)
    }
  }
  return (
    <div className=' h-screen'>
      <form action="" onSubmit={handleSubmit(onSubmit)} noValidate >

        <div className={style.bodyClass}>
          <h1 className={style.titleClass}>
              Login to your account
          </h1>

          <div>
              <label htmlFor="email"  className={style.labelClass}>Email</label>
              <input type="email" id="email" name="email" placeholder="Email"
                className={style.inputClass}
                {
                  ...register('email',{
                    required:'Email is mandatory',
                    pattern:{
                      value:/^[a-z0-9._]+@[a-z].[a-z]/,
                      message: 'Invalid email format'
                    },
                    validate:{
                      usingDomain: (fieldValue) => {
                        return(
                          fieldValue.endsWith('napses.com') || 'This domain is not supported use work mail'
                        )
                      }
                    }
                  })
                } />
                <p className={style.errorClass}>{errors.email?.message.toString()}</p>
          </div>

          <div>
              <label htmlFor="password"  className={style.labelClass}>Password</label>
              <input type="password" id="password" name="password" placeholder= "password"
                className={style.inputClass}
                {
                  ...register('password',{
                    required:'Password is mandatory'
                  })
                } />
                <p className={style.errorClass}>{errors.password?.message.toString()}</p>
          </div>
          <div>
            <button className={style.buttonClass}>Login</button>            
            <a href="register" className={style.linkClass}>Register for new account</a>
          </div>
        </div>

      </form>
        <DevTool control={control}/>
    </div>
  )
}

export default login
