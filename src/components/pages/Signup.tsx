import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/auth/AuthLayout';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon, UserIcon, PhoneIcon } from 'lucide-react';
export const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    // Basic validation
    if (Object.values(formData).some(value => !value)) {
      setError('Please fill in all fields');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    setLoading(true);
    // Simulate API call
    try {
      // In a real application, this would be an API call to register the user
      await new Promise(resolve => setTimeout(resolve, 1500));
      // For demo purposes, just navigate to login
      navigate('/login');
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  return <AuthLayout title="Create your account" subtitle="Join FloZap today" linkText="Sign in" linkTo="/login" linkDescription="Already have an account?">
      {error && <div className="mb-4 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-400 p-3 rounded-md text-sm">
          {error}
        </div>}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="First Name" type="text" id="firstName" name="firstName" autoComplete="given-name" required fullWidth value={formData.firstName} onChange={handleChange} leftIcon={<UserIcon size={18} />} />
          <Input label="Last Name" type="text" id="lastName" name="lastName" autoComplete="family-name" required fullWidth value={formData.lastName} onChange={handleChange} leftIcon={<UserIcon size={18} />} />
        </div>
        <Input label="Email address" type="email" id="email" name="email" autoComplete="email" required fullWidth value={formData.email} onChange={handleChange} leftIcon={<MailIcon size={18} />} />
        <Input label="Phone Number" type="tel" id="phone" name="phone" autoComplete="tel" required fullWidth value={formData.phone} onChange={handleChange} leftIcon={<PhoneIcon size={18} />} />
        <Input label="Password" type={showPassword ? 'text' : 'password'} id="password" name="password" autoComplete="new-password" required fullWidth value={formData.password} onChange={handleChange} leftIcon={<LockIcon size={18} />} rightIcon={<button type="button" onClick={() => setShowPassword(!showPassword)} className="focus:outline-none">
              {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
            </button>} helperText="Password must be at least 8 characters" />
        <Input label="Confirm Password" type={showPassword ? 'text' : 'password'} id="confirmPassword" name="confirmPassword" autoComplete="new-password" required fullWidth value={formData.confirmPassword} onChange={handleChange} leftIcon={<LockIcon size={18} />} />
        <div className="flex items-center">
          <input id="terms" name="terms" type="checkbox" required className="h-4 w-4 text-primary-700 focus:ring-primary-500 border-secondary-300 dark:border-secondary-700 rounded" />
          <label htmlFor="terms" className="ml-2 block text-sm text-secondary-900 dark:text-secondary-300">
            I agree to the{' '}
            <a href="#" className="text-primary-700 hover:text-primary-600">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-primary-700 hover:text-primary-600">
              Privacy Policy
            </a>
          </label>
        </div>
        <div>
          <Button type="submit" fullWidth disabled={loading} className="py-3">
            {loading ? 'Creating account...' : 'Create account'}
          </Button>
        </div>
      </form>
    </AuthLayout>;
};