import React, { createContext, useContext, useState, ReactNode } from 'react';

export type PartnerType = 'individual' | 'organizational';

interface PartnerContextType {
  partnerType: PartnerType;
  setPartnerType: (type: PartnerType) => void;
  isOrganizational: boolean;
}

const PartnerContext = createContext<PartnerContextType | undefined>(undefined);

export const usePartner = () => {
  const context = useContext(PartnerContext);
  if (context === undefined) {
    throw new Error('usePartner must be used within a PartnerProvider');
  }
  return context;
};

interface PartnerProviderProps {
  children: ReactNode;
}

export const PartnerProvider: React.FC<PartnerProviderProps> = ({ children }) => {
  const [partnerType, setPartnerType] = useState<PartnerType>('individual');

  const value = {
    partnerType,
    setPartnerType,
    isOrganizational: partnerType === 'organizational'
  };

  return (
    <PartnerContext.Provider value={value}>
      {children}
    </PartnerContext.Provider>
  );
};