
import { useForm } from "react-hook-form"
import {DevTool} from "@hookform/devtools"
import axios from 'axios'
import * as style from '../components/tailwindUtils'
import {useRouter} from 'next/router'

const register = () => {

  const router = useRouter()
  const form = useForm({
    defaultValues:{
          name:"",
          number:"",
          email:"",
          password:"",
          country:"",
          gender:""
        }
    })

  const { register, handleSubmit, formState, control } = form
  const { errors } = formState

  const onSubmit = async (data) => {
    console.log('form submitted', data)
    try{
      await axios.post("http://localhost:3001/register",{
        data
      })
      alert('Account successfully registered ')
      form.reset({
        name: "",
        number: "",
        email: "",
        password: "",
        country: "",
        gender: ""
      });
      router.push('/')
      
    }
    catch(error){
      console.error(error)
    }
  }


  return (
  <div>

    <form action="POST" onSubmit={handleSubmit(onSubmit)} noValidate >

        <div className={style.bodyClass}>
          <h1 className={style.titleClass}>
            Create a account
          </h1>
          <div>
            <label htmlFor="name" className="text-white text-sm">Name</label>
            <input type="text" id="name" name="name" placeholder="Name"
              className={style.inputClass}
              {...register('name',{
                required: 'Name is mandatory'
              })} />
              <p className={style.errorClass}>{errors.name?.message.toString()}</p>
          </div>

          <div>
            <label htmlFor="number"  className={style.labelClass}>Mobile number</label>
            <input type="number" id="number" name="number" placeholder= "Mobile number"
              className={style.inputClass}
              {
                ...register('number',{
                  required:'Mobile number is mandatory'
                })
              } />
              <p className={style.errorClass}>{errors.number?.message.toString()}</p>
          </div>

          <div>
            <label htmlFor="gender"  className=" text-white text-sm flex mt-4 mb-2">Gender</label>
            <input type="radio" id="male" name="gender" value="male" className=" bg-violet-400"
            {
              ...register('gender',{
                required:'Gender is mandatory'
              })
            }/>
            <label htmlFor="male" className=" text-white  ml-1 text-base">Male</label>
            <input type="radio" id="female" name="gender" value="female" className=" ml-3"/>
            <label htmlFor="female" className=" text-white  ml-1 text-base">Female</label>
            <input type="radio" id="other" name="gender" value="other" className=" ml-3"/>
            <label htmlFor="other" className=" text-white  ml-1 text-base">Other</label>
          </div>

          <div>
            <label htmlFor="country"  className={style.labelClass}>Country</label>
            <select name="country" id="country"
             className={style.inputClass} 
            {...register('country',{
              required:'Please select your country'
            })}>
              <option value="India">India</option>
              <option value="SriLanka">SirLanka</option>
              <option value="Japan">Japan</option>
            </select>
              <p className={style.errorClass}>{errors.country?.message.toString()}</p>
          </div>

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

          
              <button className={style.buttonClass}>Register</button>
              <a href="/" className={style.linkClass}>Already have a account</a>
          

        </div>

    </form>
    <DevTool control={control}/>
  </div>
  )
}

export default register
