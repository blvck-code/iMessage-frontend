import { Button, Center, Image, Input, Stack, Text } from "@chakra-ui/react";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import UserOperations from "@/graphql/operations/user";
import { CreateUsernameData, CreateUsernameVariable } from "@/util/types";

interface IAuthProps {
  session: Session | null;
  reloadSession: () => void;
}

const Auth: React.FunctionComponent<IAuthProps> = ({
  session,
  reloadSession,
}) => {
  const [username, setUsername] = useState("");
  const [createUsername, { data, loading, error }] = useMutation<
    CreateUsernameData,
    CreateUsernameVariable
  >(UserOperations.Mutations.createUsername);

  console.log("Data =>", data, loading, error);

  const onSubmit = async () => {
    if (!username) return;
    try {
      /**
       * createUsername mutation
       */
    } catch (error) {
      console.log("onSubmit error =>", error);
    }
  };
  return (
    <Center height="100vh">
      <Stack alignItems="center" spacing={8}>
        {session ? (
          <>
            <Text fontSize="3xl">Create a Username:</Text>
            <Input
              placeholder="Enter a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Button width="100%" onClick={onSubmit}>
              Save
            </Button>
          </>
        ) : (
          <>
            <Text fontSize="3xl">MessengerQL</Text>
            <Button
              leftIcon={
                <Image
                  height="20px"
                  src="/images/googlelogo.png"
                  alt="google logo"
                />
              }
              onClick={() => signIn("google")}
            >
              Continue with Google
            </Button>
          </>
        )}
      </Stack>
    </Center>
  );
};

export default Auth;
