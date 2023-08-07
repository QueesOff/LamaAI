import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Link,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { useTranslation } from 'react-i18next';

const Login: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const [values, setValues] = useState({
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = () => {
    if (!values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);
    signInWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);

        history.push("/");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Вход</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <Flex
          minH={'100vh'}
          align={'center'}
          justify={'center'}
          bg={useColorModeValue('gray.50', 'gray.800')}>
          <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Stack align={'center'}>
              <Heading fontSize={'4xl'}>{t('login.title')}</Heading>
              <Text fontSize={'lg'} color={'gray.600'}>
                {t('signup.desc')} <Link color={'blue.400'}>AI</Link> ✌️
              </Text>
            </Stack>
            <Box
              rounded={'lg'}
              bg={useColorModeValue('white', 'gray.700')}
              boxShadow={'lg'}
              p={8}>
              <Stack spacing={4}>
                <FormControl id="email">
                  <FormLabel>Эл. почта</FormLabel>
                  <Input
                    type="email"
                    onChange={(event) =>
                      setValues((prev) => ({ ...prev, email: event.target.value }))
                    }
                    placeholder="Введите эл. почту"
                  />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Пароль</FormLabel>
                  <Input type="password"
                    onChange={(event) =>
                      setValues((prev) => ({ ...prev, pass: event.target.value }))
                    }
                    placeholder="Введите пароль" />
                </FormControl>
                <Stack spacing={10}>
                  <Button
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}
                    disabled={submitButtonDisabled} onClick={handleSubmission}>
                    {t('signup.p2')}
                  </Button>
                </Stack>
                <Stack pt={6}>
                  <Text align={'center'}>
                  { t('login.p1')} <Link color={'blue.400'} href="/signup">{t('login.p2')}</Link>
                  </Text>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      </IonContent>
    </IonPage>
  );
};

export default Login;
