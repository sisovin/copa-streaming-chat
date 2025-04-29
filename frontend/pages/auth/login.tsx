import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useAuth } from '../../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    login(username, password);
    router.push('/');
  };

  return (
    <div>
      <h1>Login</h1>
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
      <Button label="Login" onClick={handleLogin} />
    </div>
  );
};

export default LoginPage;
