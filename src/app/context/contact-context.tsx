"use client";

import React, {
  useRef,
  createContext,
  useState,
  ReactNode,
  useContext,
} from "react";

interface ContactContextState {
  open: boolean;
  toggleContact: () => void;
  data?: {
    company_name?: string;
    category_name?: string;
    name?: string;
  } | null;
  setCompanyData: (dataCompany: any) => void;
}

const ContactContext = createContext<ContactContextState | undefined>(
  undefined,
);

const ContactContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<ContactContextState["data"] | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  console.log(data);
  const toggleContact = () => {
    if (formRef.current) {
      formRef.current.reset();
    }

    setOpen((prev) => !prev);
  };

  const setCompanyData = (dataCompany: any) => {
    setData((prev) => ({
      ...prev,
      ...dataCompany,
    }));
    setOpen((prev) => !prev);
  };

  return (
    <ContactContext.Provider
      value={{ open, data, toggleContact, setCompanyData }}
    >
      {children}
    </ContactContext.Provider>
  );
};

const useContactContext = (): ContactContextState => {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error("use provider");
  }
  return context;
};

export { ContactContextProvider, useContactContext };