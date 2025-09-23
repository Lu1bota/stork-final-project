'use client';

import React, { JSX, useState } from 'react';
import Select from 'react-select';
import { genderOptions } from '../../app/data';


const Checkbox = ({ children, ...props }: JSX.IntrinsicElements['input']) => (
    <label style={{ marginRight: '1em' }}>
      <input type="checkbox" {...props} />
      {children}
    </label>
  );
  
  const CustomSelect = () => {
    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRtl, setIsRtl] = useState(false);
  
    return (
      <>
        <Select
          className="myCustomSelect"
          classNamePrefix="react-select"
          defaultValue={genderOptions[0]}
          isDisabled={isDisabled}
          isLoading={isLoading}
          isClearable={isClearable}
          isRtl={isRtl}
          isSearchable={isSearchable}
          name="gender"
          options={genderOptions}
        />
  
        <div>
          <Checkbox checked={isClearable} onChange={() => setIsClearable((s) => !s)}>Clearable</Checkbox>
          <Checkbox checked={isSearchable} onChange={() => setIsSearchable((s) => !s)}>Searchable</Checkbox>
          <Checkbox checked={isDisabled} onChange={() => setIsDisabled((s) => !s)}>Disabled</Checkbox>
          <Checkbox checked={isLoading} onChange={() => setIsLoading((s) => !s)}>Loading</Checkbox>
          <Checkbox checked={isRtl} onChange={() => setIsRtl((s) => !s)}>RTL</Checkbox>
        </div>
      </>
    );
  };
  
  export default CustomSelect;