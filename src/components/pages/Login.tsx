import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/auth/AuthLayout';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from 'lucide-react';
export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setLoading(true);
    // Simulate API call
    try {
      // In a real application, this would be an API call to authenticate the user
      await new Promise(resolve => setTimeout(resolve, 1000));
      // For demo purposes, just navigate to dashboard
      navigate('/');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };
  return <AuthLayout title="Sign in to your account" subtitle="Access your FloZap dashboard" linkText="Sign up" linkTo="/signup" linkDescription="Don't have an account?">
      {error && <div className="mb-4 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-400 p-3 rounded-md text-sm">
          {error}
        </div>}
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <Input label="Email address" type="email" id="email" name="email" autoComplete="email" required fullWidth value={email} onChange={e => setEmail(e.target.value)} leftIcon={<MailIcon size={18} />} />
        </div>
        <div>
          <Input label="Password" type={showPassword ? 'text' : 'password'} id="password" name="password" autoComplete="current-password" required fullWidth value={password} onChange={e => setPassword(e.target.value)} leftIcon={<LockIcon size={18} />} rightIcon={<button type="button" onClick={() => setShowPassword(!showPassword)} className="focus:outline-none">
                {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
              </button>} />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-primary-700 focus:ring-primary-500 border-secondary-300 dark:border-secondary-700 rounded" />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-secondary-900 dark:text-secondary-300">
              Remember me
            </label>
          </div>
          <div className="text-sm">
            <a href="#" className="font-medium text-primary-700 hover:text-primary-600">
              Forgot your password?
            </a>
          </div>
        </div>
        <div>
          <Button type="submit" fullWidth disabled={loading} className="py-3">
            {loading ? 'Signing in...' : 'Sign in'}
          </Button>
        </div>
      </form>
    </AuthLayout>;
};