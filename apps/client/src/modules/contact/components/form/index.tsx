import { Box, Stack, TextInput, Textarea, Title } from "@mantine/core";
import classes from "./index.module.css";
import BookButton from "@/modules/common/components/buttons/book-now";

const ContactForm = () => {
  return (
    <Box className={classes.formContainer}>
      <Title order={3} fw={500} mb="md">
        Send Us a Message
      </Title>

      <form>
        <Stack gap="md">
          <TextInput
            label="Your Name"
            placeholder="John Doe"
            required
            classNames={{ input: classes.input }}
          />
          <TextInput
            label="Your Email"
            placeholder="john@example.com"
            type="email"
            required
            classNames={{ input: classes.input }}
          />
          <Textarea
            label="Message"
            placeholder="Write your message here..."
            minRows={4}
            required
            classNames={{ input: classes.textarea }}
          />
          <BookButton type="submit" className={classes.submitBtn}>
            Send Message
          </BookButton>
        </Stack>
      </form>
    </Box>
  );
};

export default ContactForm;
