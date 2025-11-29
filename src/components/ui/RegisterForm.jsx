import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";

const validationSchema = Yup.object({
  first_name: Yup.string().required("Имя обязательно"),
last_name: Yup.string().required("Фамилия обязательна"),

email: Yup.string()
  .min(10, "Email должен быть минимум 10 символов")
  .max(50, "Email должен быть максимум 50 символов")
  .email("Неверный email")
  .required("Email обязателен"),

phone: Yup.string()
  .min(11, "Телефон должен быть минимум 11 символов")
  .max(12, "Телефон должен быть максимум 12 символов")
  .required("Телефон обязателен"),

password: Yup.string()
  .min(6, "Пароль должен быть не менее 6 символов")
  .required("Пароль обязателен"),

confirm_password: Yup.string()
  .oneOf([Yup.ref("password"), null], "Пароли должны совпадать")
  .required("Подтверждение пароля обязательно"),

volunteer: Yup.boolean(),
organization: Yup.string(),

});

function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (

   <section className="flex justify-center items-center h-auto sm:h-screen bg-zinc-800">
  <Formik
    initialValues={{
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      password: "",
      confirm_password: "",
      volunteer: false,
      organization: "",
    }}
    validationSchema={validationSchema}
    onSubmit={async (values, { setSubmitting, resetForm }) => {
      try {
        const response = await axios.post("http://localhost:5000/auth/register", values, { withCredentials: true });
        localStorage.setItem("user", JSON.stringify({ ...values, accessToken: response.data.accessToken }));
        resetForm();
        window.location.href = "/";
      } catch (error) {
        alert(error.response?.data?.message || "Registration failed");
      }
      setSubmitting(false);
    }}
  >
    {({ isSubmitting }) => (
      <div className="flex flex-col md:flex-row w-full max-w-4xl">
        <div className="flex-1 p-8  md:rounded-lg shadow-md
                        bg-gradient-to-r from-indigo-600 via-purple-500 via-blue-500 to-indigo-400 text-white 
                        min-h-[300px] md:min-h-[500px]">
          <h2 className="text-2xl font-bold mb-4 mt-0 sm:mt-20 md:mt-0">Регистрация</h2>
          <p>Какая-то информация, если надо</p>
          <p className="my-4">Уже есть аккаунт? <Link className="text-blue-900 underline" to={"/login"}>Авторизация.</Link></p>
          <Link className="text-blue-900 underline" to={"/"}>Вернутся на главную</Link>
          <p className="mt-8">sponsored by Название</p>
        </div>

        <Form className="bg-white p-8 md:rounded-lg shadow-md grid grid-cols-1 w-full md:w-lg">
  
            {/* Имя */}
            <label className="text-zinc-700 text-sm md:text-lg">Имя:</label>
            <div>
              <Field className="border rounded pl-2 py-2 w-full text-zinc-700" type="text" minLength={2} maxLength={40} name="first_name" placeholder="Введите имя" />
              <ErrorMessage name="first_name" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Фамилия */}
            <label className="text-zinc-700 text-sm md:text-lg mt-4">Фамилия:</label>
            <div>
              <Field className="border rounded pl-2 py-2 w-full text-zinc-700" minLength={2} maxLength={40} type="text" name="last_name" placeholder="Введите фамилию" />
              <ErrorMessage name="last_name" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Почта */}
            <label className="text-zinc-700 text-sm md:text-lg mt-4">Почта:</label>
            <div>
              <Field className="border rounded pl-2 py-2 w-full text-zinc-700" minLength={10} maxLength={50} type="email" name="email" placeholder="Введите почту" />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Телефон */}
            <label className="text-zinc-700 text-sm md:text-lg mt-4">Телефон:</label>
            <div>
              <Field className="border rounded pl-2 py-2 w-full text-zinc-700" type="text" minLength={11} maxLength={12} name="phone" placeholder="Введите номер телефона" />
              <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Пароль */}
            <div className="relative w-full mt-4">
              <label className="text-zinc-700 text-sm md:text-lg flex items-center">
                <p>Пароль:</p>
                  <div className="flex items-center gap-2 mt-1 ml-4">
                <input
                  type="checkbox"
                  id="showPassword"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                />
                <label htmlFor="showPassword" className="text-zinc-700 text-sm">
                  Показать пароль
                </label>
              </div>
              </label>
              <Field
                className="border rounded pl-2 py-2 w-full text-zinc-700"
                type={showPassword ? "text" : "password"}
                name="password"
                minLength={4}
                maxLength={50}
                placeholder="Введите пароль"
              />
              
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Волонтер */}
           
            <div className="flex items-center gap-2 mt-4">
              <Field className="!bg-blue-700" type="checkbox" name="volunteer" />
              <span className="text-zinc-700 text-sm md:text-lg">Являетесь ли вы волонтером?</span>
            </div>

            {/* Организация */}
            <label className="text-zinc-700 text-sm md:text-lg mt-4">Организация:</label>
            <div>
              <Field className="border rounded pl-2 py-2 w-full text-zinc-700" minLength={3} maxLength={50} type="text" name="organization" placeholder="Ваша организация (Если вы волонтер)" />
              <ErrorMessage name="organization" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <button type="submit" className="mt-12 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition w-full" disabled={isSubmitting}>
            {isSubmitting ? "Регистрация..." : "Регистрация"}
          </button>
        </Form>
      </div>
    )}
  </Formik>
  </section>

  );
}

export default RegisterForm;
