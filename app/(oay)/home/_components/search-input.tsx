'use client';

import { ChangeEvent, FormEvent, useCallback, useMemo } from 'react';

import { PlaceholdersAndVanishInput } from '@/components/aceternity';

export const SearchInput = () => {
  const placeholders = useMemo(
    () => ['Who is Fiantso Harena?', 'What is happening in your neighborhood?', 'How about the traffics?'],
    []
  );

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  }, []);

  const handleFormSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submitted');
  }, []);

  return (
    <PlaceholdersAndVanishInput placeholders={placeholders} onChange={handleInputChange} onSubmit={handleFormSubmit} />
  );
};
