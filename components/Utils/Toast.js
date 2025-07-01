
import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const ToastWrapper = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  color: white;
  font-weight: 500;
  z-index: 1000;
  animation: ${fadeIn} 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;

  // Estilo condicional baseado no tipo (success ou error)
  background-color: ${({ type }) => (type === 'success' ? '#2e7d32' : '#d32f2f')};
`;

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return <ToastWrapper type={type}>{message}</ToastWrapper>;
};

export default Toast;