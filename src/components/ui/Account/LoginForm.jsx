import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useLayoutEffect, useState } from "react";

const validationSchema = Yup.object({
  email: Yup.string()
  .email("Неверный email")
  .required("Email обязателен"),
password: Yup.string()
  .min(6, "Пароль должен быть не менее 6 символов")
  .required("Пароль обязателен"),

});


function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

useEffect(() => {
  const user = localStorage.getItem("user");
  if (user) {
    navigate("/"); 
  }
 }, [navigate]);

 useLayoutEffect(() => {
  document.title = "Авторизация | Animals"
 })


  return (
     <section className="flex justify-center items-center h-screen p-0 sm:p-4 md:p-0">
      
      {loading && (
                <div className="absolute inset-0 bg-black/70 flex justify-center items-center z-10">
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin h-6 w-6 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                    </svg>
                    <span className="ml-3 text-white font-semibold">Авторизация...</span>
                  </div>
                </div>
              )}
       <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          setLoading(true);
          const response = await axios.post(
            "http://localhost:5000/auth/login",
            values,
            { withCredentials: true } // важно для httpOnly cookie
          );

          // Сохраняем данные пользователя и токен
          localStorage.setItem("user", JSON.stringify({
          id: response.data.id,
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          email: response.data.email,
          rights: Number(response.data.rights),
          volunteer: Number(response.data.volunteer),
          accessToken: response.data.accessToken
        }));

       
        
        setTimeout(() => {
          resetForm();
          navigate("/");
        }, 3000);
        } catch (error) {
          alert(error.response?.data?.message || "Ошибка авторизации");
          setLoading(false);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
      
          
          <div className="flex flex-col md:flex-row w-full max-w-3xl"
        style={{ boxShadow: '35px 30px 35px 15px rgba(0,0,0,0.4)' }}>
          <div className="flex-1 p-8 md:rounded-lg shadow-md
                          bg-gradient-to-b from-gray-800 to-emerald-900 text-white 
                          min-h-[280px]">
            <h2 className="text-2xl font-bold mb-4">Авторизация</h2>
            <p>Какая-то информация, если надо</p>
            <p className="my-4">Еще нет аккаунта? <Link className="text-blue-400 underline" to={"/register"}>Регистрация.</Link></p>
            <Link className="text-blue-400 underline" to={"/"}>Вернутся на главную</Link>
            <p className="mt-8">sponsored by Название</p>
          </div>

          <Form className="bg-white p-8 md:rounded-lg shadow-md relative -ml-8" style={{ boxShadow: '-15px 0px 15px -5px rgba(0,0,0,0.4)' }}>
          
              {/* Почта */}
              <label className="text-zinc-700 text-sm md:text-lg font-medium">Почта:</label>
              <div>
                <Field className="border rounded font-medium pl-2 py-2 w-full text-stone-500" minLength={10} maxLength={50} type="email" name="email" placeholder="Введите почту" />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Пароль */}
              
            <div className="relative w-full mt-4">
                <label className="text-zinc-700 font-medium text-sm md:text-lg">Пароль:</label>
                <Field
                  className="border rounded pl-2 font-medium py-2 w-full text-stone-500"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  minLength={4}
                  maxLength={50}
                  placeholder="Введите пароль"
                />
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="checkbox"
                    id="showPassword"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                  />
                  <label htmlFor="showPassword" className="text-zinc-700 text-sm md:text-lg">
                    Показать пароль
                  </label>
                </div>
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>
      

            <button type="submit" className="mt-12 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition w-full" disabled={isSubmitting || loading}>
              {loading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 text-white -ml-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                      </svg>
                      <p className="ml-4">Авторизация...</p>
                    </div>
                  ) : "Авторизация"}
            </button>
          </Form>
        </div>
      
        
      )}
    </Formik>

     </section>
   
  );
}

export default LoginForm;
