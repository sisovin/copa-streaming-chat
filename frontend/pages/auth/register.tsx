import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useAuth } from '../../contexts/AuthContext';

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    if (password === confirmPassword) {
      // Implement register logic here
      login(username, password);
      router.push('/');
    } else {
      // Handle password mismatch
      alert('Passwords do not match');
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <Input
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Button label="Register" onClick={handleRegister} />
    </div>
  );
};

export default RegisterPage;
