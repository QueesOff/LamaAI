import { Card, CardBody, Container, Image, Input, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';


function Content() {
  const { t } = useTranslation();
  return (
    <Container p={"10px 20px"} display={"flex"} flexDirection={"column"} alignItems={"center"}>
      <Container display={"flex"} flexDirection={"column"} gap={5} mb={"40%"}>
        <Image src="/assets/img/logo-main.svg" w={10} h={10}/>
        <Text fontSize={"18px"} fontWeight={"bold"} w={"70%"}>{t("main.h1")}</Text>
        <Image src="/assets/img/llama.png" position={"absolute"} right={10} top={10} w={"200px"}/>
      </Container>
      <h1>L a m a AI</h1>
      <Card w={"80%"} h={"50%"} bgColor={"#495CFF"} borderRadius={20} p={"20px 20px"} gap={5}>
        <Text fontSize={"12px"} color={"white"}>{t("main.ask")}</Text>
        <Container display={"flex"} alignItems={"flex-start"} gap={2}>
          <Image src="/assets/img/logo-white.svg" flex={"start"}  w={10} h={10}/>
          <Text fontSize={"12px"} color={"white"}>{t("main.question")}</Text>
        </Container>
        <Container display={"flex"} alignItems={"flex-start"} gap={3}>
          <Image src="/assets/img/logo-white.svg" flex={"start"}  w={10} h={10}/>
          <Input variant='filled' placeholder={t('gpt.mp')} fontSize={"12px"} borderRadius={50}/>
        </Container>
      </Card>
    </Container>
  );
}
export default Content;