import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';


const Home = () => {
  const { data: session } = useSession();
  const [serverDate, setServerDate] = useState('');
  const [staticDate, setStaticDate] = useState('');
  const [clientDate, setClientDate] = useState('');
  const router = useRouter();



  useEffect(() => {
    const fetchServerDate = async () => {
      const serverResponse = await fetch('http://localhost:3000/api/date');
      const serverData = await serverResponse.json();
      setServerDate(serverData.date);
    };

    const fetchClientDate = async () => {
      const clientResponse = await fetch('/api/date');
      const clientData = await clientResponse.json();
      setClientDate(clientData.date);
    };

    fetchServerDate();
    fetchClientDate();

    setStaticDate(new Date().toLocaleDateString());
  }, []);

  return (
    <div>
      {!session ? (
        <div>
          <button onClick={() => router.push('/api/auth/signin')}>Sign in</button>
          <h1>Server-Side Rendering (SSR)</h1>
          <p>Server Date: {serverDate}</p>

          <h1>Static Site Generation (SSG)</h1>
          <p>Static Date: {staticDate}</p>

          <h1>Client-Side Rendering (CSR)</h1>
          <p>Client Date: {clientDate}</p>
        </div>
      ) : (
        <div>
          <p>Welcome, {session.user?.name}!</p>
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      )}
    </div>
  );
};

export default Home;
