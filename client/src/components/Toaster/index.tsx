import { useToast } from '@chakra-ui/react';

interface ToasterProps {
  title: string;
  description: string;
  status: 'success' | 'info' | 'warning' | 'error' | 'loading';
}
const Toaster = ({ title, description, status }: ToasterProps) => {
  const toast = useToast();
  return (
    <>
      {toast({
        title: title,
        description: description,
        status: status,
        duration: 6000,
        isClosable: true,
        position: 'top',
      })}
    </>
  );
};

export default Toaster;
