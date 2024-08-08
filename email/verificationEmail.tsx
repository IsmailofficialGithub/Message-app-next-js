import { Html, Head, Preview, Heading, Row, Section, Text} from '@react-email/components';

interface VerificationEmailProps{
     username:string;
     otp:string;
}

export default function VerificationEmail({username,otp}:
     VerificationEmailProps){
          return(
               <Html lang='en' dir="ltr">
                    <Head>
                         <title>Verification Code </title>
                    </Head>
                    <Preview>Here&apos;s your verification code :{otp}</Preview>
                    <Section>
                         <Row>
                              <Heading as="h2">Hello {username}</Heading>
                         </Row>
                         <Row>
                              <Text>
                              Thanks you for registering .Please use the Following Verification code to complete Your Registration:
                              </Text>
                         </Row>
                         <Row>
                              <Text>{otp}</Text>
                         </Row>
                         <Row>
                              <Text>
                                   If You did not request this code , please ignore this email.
                              </Text>
                         </Row>
                         
                    </Section>
               </Html>
          )
     }