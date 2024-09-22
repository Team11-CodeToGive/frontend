import { useState } from 'react';
import { Mail, Lock, User, MapPin, Home, Building, AlertCircle, CheckCircle2 } from 'lucide-react';
import Modal from './Modal';

// Simple Alert component using Tailwind CSS and Lucide React icons
const Alert = ({ variant = 'info', children }) => {
  const colors = {
    info: 'bg-blue-100 text-blue-800',
    success: 'bg-green-100 text-green-800',
    error: 'bg-red-100 text-red-800',
  };

  const icons = {
    info: <AlertCircle size={20} className="mr-2" />,
    success: <CheckCircle2 size={20} className="mr-2" />,
    error: <AlertCircle size={20} className="mr-2" />,
  };

  return (
    <div className={`p-4 mb-4 rounded-lg ${colors[variant]} flex items-center`} role="alert">
      {icons[variant]}
      <div className="font-medium">{children}</div>
    </div>
  );
};

const LoginSignupForm = () => {

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

  const raw = JSON.stringify({
    "password": "Pranil@123",
    "email": "ingle.pranil@gmail.com"
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("https://PranilIngle.pythonanywhere.com/users/login", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));


  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
    location: {
      zipcode: '',
      address: '',
      name: '',
    },
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const url = isLogin
      ? 'https://PranilIngle.pythonanywhere.com/users/login'
      : 'https://PranilIngle.pythonanywhere.com/users/create';

    const bodyData = isLogin
      ? { email: formData.email, password: formData.password }
      : formData;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),
      });

      if (!response.ok) {
        throw new Error(isLogin ? 'Login failed' : 'Failed to create user');
      }

      const data = await response.json();
      setSuccess(isLogin ? 'Logged in successfully!' : 'User created successfully!');
      console.log(isLogin ? 'Logged in:' : 'User created:', data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    
    <div className=" flex flex-col justify-center mx-4">
      <button 
                onClick={openModal}
                
                className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90"
            >
                Open Report Form
            </button>

            <Modal formType="event" isOpen={isModalOpen} onClose={closeModal} />
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {isLogin ? 'Sign in to your account' : 'Create a new account'}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white border border-1  py-8 px-4  rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <div className="mt-1 relative rounded-md ">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required={!isLogin}
                    className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1 relative rounded-md ">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative rounded-md ">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            {!isLogin && (
              <>
                <div>
                  <label htmlFor="location.zipcode" className="block text-sm font-medium text-gray-700">
                    Zipcode
                  </label>
                  <div className="mt-1 relative rounded-md ">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="location.zipcode"
                      name="location.zipcode"
                      type="text"
                      required={!isLogin}
                      className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                      value={formData.location.zipcode}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="location.address" className="block text-sm font-medium text-gray-700">
                    Street Address
                  </label>
                  <div className="mt-1 relative rounded-md ">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Home className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="location.address"
                      name="location.address"
                      type="text"
                      required={!isLogin}
                      className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                      value={formData.location.address}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="location.name" className="block text-sm font-medium text-gray-700">
                    Building Name
                  </label>
                  <div className="mt-1 relative rounded-md ">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Building className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="location.name"
                      name="location.name"
                      type="text"
                      required={!isLogin}
                      className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                      value={formData.location.name}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-primary hover:bg-purple-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                {isLogin ? 'Sign in' : 'Sign up'}
              </button>
            </div>
          </form>

          <div className="my-6">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
                setSuccess('');
              }}
              className="w-full text-center text-sm text-seceondary hover:text-primary"
            >
              {isLogin ? 'Create a new account' : 'Already have an account? Sign in'}
            </button>
          </div>

          {error && <Alert variant="error">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
        </div>
      </div>
    </div>
  );
};

export default LoginSignupForm;