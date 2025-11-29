import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";

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
  return (
     <section className="flex justify-center items-center h-screen bg-zinc-800 p-0 sm:p-4 md:p-0">
       <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          const response = await axios.post(
            "http://localhost:5000/auth/login",
            values,
            { withCredentials: true } // важно для httpOnly cookie
          );

          // Сохраняем данные пользователя и токен
          localStorage.setItem("user", JSON.stringify({
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          email: response.data.email,
          rights: Number(response.data.rights),
          volunteer: Number(response.data.volunteer),
          accessToken: response.data.accessToken
        }));

        resetForm();
        window.location.href = "/";
        } catch (error) {
          alert(error.response?.data?.message || "Ошибка авторизации");
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
       
        <div className="flex flex-col md:flex-row w-full max-w-4xl">
        <div className="flex-1 p-8 md:rounded-lg shadow-md
                        bg-gradient-to-r from-indigo-600 via-purple-500 via-blue-500 to-indigo-400 text-white 
                        min-h-[280px]">
          <h2 className="text-2xl font-bold mb-4">Авторизация</h2>
          <p>Какая-то информация, если надо</p>
          <p className="my-4">Еще нет аккаунта? <Link className="text-blue-900 underline" to={"/register"}>Регистрация.</Link></p>
          <Link className="text-blue-900 underline" to={"/"}>Вернутся на главную</Link>
          <p className="mt-8">sponsored by Название</p>
        </div>

        <Form className="bg-white p-8 md:rounded-lg shadow-md ">
          
            {/* Почта */}
            <label className="text-zinc-700 text-sm md:text-lg ">Почта:</label>
            <div>
              <Field className="border rounded pl-2 py-2 w-full text-zinc-700" minLength={10} maxLength={50} type="email" name="email" placeholder="Введите почту" />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Пароль */}
            
           <div className="relative w-full mt-4">
              <label className="text-zinc-700 text-sm md:text-lg">Пароль:</label>
              <Field
                className="border rounded pl-2 py-2 w-full text-zinc-700"
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
    

          <button type="submit" className="mt-12 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition w-full" disabled={isSubmitting}>
            {isSubmitting ? "Авторизация..." : "Авторизация"}
          </button>

        </Form>
      </div>
      )}
    </Formik>

     </section>
   
  );
}

export default LoginForm;
