import React, { useEffect } from 'react';
import { useListPets, useShowPetById } from './api/endpoints/petstoreFromFileSpecWithTransformer';
import './App.css';
import { useAuthDispatch } from './auth.context';
import logo from './logo.svg';

function App() {
  const dispatch = useAuthDispatch();
  const { data: pets, refetch } = useListPets();

  // Repro for #2397
  let petId: string | undefined = undefined
  // @ts-expect-error: Argument of type 'undefined' is not assignable to parameter of type 'string'.ts(2769)
  const { data: pet } = useShowPetById(petId, 1, {
    query: {
      staleTime: 60 * 1000
    }
  })

  useEffect(() => {
    dispatch('token');
    setTimeout(() => {
      refetch();
    }, 2000);
  }, [refetch, dispatch]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {pets?.map((pet: any) => (
          <p key={pet.id}>{pet.name}</p>
        ))}
      </header>
    </div>
  );
}

export default App;
