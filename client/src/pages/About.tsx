import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import {
  Box,
  Container,
  Button,
  Stack,
} from '@chakra-ui/react';
import { useTranslation } from "react-i18next";
import { auth } from "../firebase";
import AdminPage from "../components/AdminPage";

interface HomeProps {
  name?: string;
}

const About: React.FC<HomeProps> = (props) => {
  const { t } = useTranslation();
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserLoggedIn(true);
      } else {
        setUserLoggedIn(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        console.log("User logged out successfully!");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{t('menu.room')}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <Container maxW={'3xl'}>
          <Stack
            as={Box}
            alignItems={'center'}
            textAlign={'center'}
            spacing={{ base: 8, md: 14 }}
            py={{ base: 20, md: 36 }}>
            {userLoggedIn ? (
              <>
              <AdminPage />
              <Button
                width={250}
                colorScheme={'red'}
                bg={'red.400'}
                rounded={'full'}
                px={6}
                onClick={handleLogout}
                _hover={{
                  bg: 'red.500',
                }}
              >
                {t('login.log')}
              </Button>
              </>
            ) : (
              <>
                <Button
                  width={250}
                  colorScheme={'green'}
                  bg={'green.400'}
                  rounded={'full'}
                  px={6}
                  _hover={{
                    bg: 'green.500',
                  }}
                >
                  <Link to="/login">{t('signup.p2')}</Link>
                </Button>
                <Button variant={'link'} colorScheme={'blue'} size={'sm'}>
                  <Link to="/signup">{t('login.p2')}</Link>
                </Button>
              </>
            )}
          </Stack>
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default About;
