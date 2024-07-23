import React, { createContext, useContext, useState, ReactNode } from "react";

type DateContextType = {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
};

export const DateContext = createContext<DateContextType | undefined>(undefined);

export const DateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const contextValue: DateContextType = {
    selectedDate,
    setSelectedDate
  };

  return React.createElement(DateContext.Provider, { value: contextValue }, children);
};

export const useDate = (): DateContextType => {
  const context = useContext(DateContext);
  if (!context) {
    throw new Error("useDate must be used within a DateProvider");
  }
  return context;
};