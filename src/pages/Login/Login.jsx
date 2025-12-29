import { useState, useEffect } from "react";
import PrimaryLogoLight from "../../assets/Logo/Logo_Primary_Dark.png";
import { FaUser, FaLock } from "react-icons/fa";
import { Route, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

// --- Komponen Umpan Balik Validasi Inline ---
const ValidationMessage = ({ isValid, message, isTouched }) => {
  if (isTouched && isValid === false) {
    return (
      <p
        className="validation-error"
        style={{
          color: "red",
          fontSize: "0.8em",
          marginTop: "5px",
          marginLeft: "50px",
        }}
      >
        {message}
      </p>
    );
  }
  return null;
};

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "", // Menggunakan email sesuai standar Register
    password: "",
  });

  const [isTouched, setIsTouched] = useState({});
  const [validationErrors, setValidationErrors] = useState({
    email: false,
    password: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [submitErrorsList, setSubmitErrorsList] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  // Endpoint API Login
  const API_URL = "http://localhost:5000/api/users";

  // --- Definisi Fungsi Validasi ---
  const validateField = (name, value) => {
    let isValid = true;
    let errorMessage = null;

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = "Format email tidak valid.";
      }
    } else if (name === "password") {
      if (value.length < 1) {
        isValid = false;
        errorMessage = "Password wajib diisi.";
      }
    }

    return { isValid, errorMessage };
  };

  // --- Handlers ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setSubmitErrorsList([]);

    const { isValid } = validateField(name, value);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: isValid,
    }));
  };

  const handleInputBlur = (e) => {
    const { name } = e.target;
    setIsTouched((prevTouched) => ({
      ...prevTouched,
      [name]: true,
    }));
  };

  // Mengontrol Status Tombol
  useEffect(() => {
    const isFormComplete = Object.values(formData).every(
      (value) => value.trim() !== ""
    );
    const allFieldsValid = Object.values(validationErrors).every(
      (isValid) => isValid === true
    );
    setIsButtonDisabled(!(isFormComplete && allFieldsValid));
  }, [formData, validationErrors]);

  // Handler Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitErrorsList([]);
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST", // Gunakan POST
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        // Jika backend mengirim status 200 (OK)
        console.log("Login Berhasil:", responseData);
        login(responseData);
        navigate("/");
      } else {
        // Jika backend mengirim error (404 untuk email, 401 untuk password)
        setSubmitErrorsList([responseData.error]);
      }
    } catch (error) {
      setSubmitErrorsList(["Gagal terhubung ke server."]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="LoginSection">
      <form className="LoginForm" onSubmit={handleSubmit} noValidate>
        <img src={PrimaryLogoLight} alt="Primary Logo" className="LoginLogo" />

        {/* Tampilkan Error Submit Global */}
        {submitErrorsList.length > 0 && (
          <div
            style={{
              padding: "10px",
              backgroundColor: "#fdd",
              border: "1px solid red",
              borderRadius: "5px",
              marginBottom: "20px",
              textAlign: "center",
              color: "red",
              fontSize: "0.9em",
            }}
          >
            {submitErrorsList[0]}
          </div>
        )}

        <div className="LoginInputGroup">
          {/* Input Email/Username */}
          <div className="LoginInput">
            <FaUser className="LoginIcon" />
            <input
              type="email"
              placeholder="Email"
              className="LoginInputTextfield"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
            />
          </div>
          <ValidationMessage
            isValid={validationErrors.email}
            message="Masukkan alamat email yang valid."
            isTouched={isTouched.email}
          />

          {/* Input Password */}
          <div className="LoginInput">
            <FaLock className="LoginIcon" />
            <input
              type="password"
              placeholder="******"
              className="LoginInputTextfield"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
            />
          </div>
          <ValidationMessage
            isValid={validationErrors.password}
            message="Password harus diisi."
            isTouched={isTouched.password}
          />

          <a href="#" className="p1 txt-color-primary">
            lupa password
          </a>
        </div>

        <div className="AlignCenter">
          <button
            className="button-primary-fill"
            type="submit"
            disabled={isButtonDisabled || isLoading}
          >
            {isLoading ? "Memproses..." : "Masuk"}
          </button>
          <p className="p1">
            belum punya akun?{" "}
            <a href="/register" className="p1 txt-color-primary">
              buat akun
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}
