import { Group, Stack, Text, ThemeIcon, Title } from "@mantine/core";
import {
  IconMail,
  IconMapPin,
  IconPhoneCall,
  IconSunHigh,
} from "@tabler/icons";
import React from "react";

const contactInformation = [
  {
    title: "Email",
    detail: "luxwoodwork@email.com",
    icon: <IconMail size={20} />,
  },
  {
    title: "Phone Number",
    detail: "(63+)9329821232",
    icon: <IconPhoneCall size={20} />,
  },
  {
    title: "Address",
    detail: "Alabang-Zapote Avenue, Pamplona 3",
    icon: <IconMapPin size={20} />,
  },
  {
    title: "Working Hours",
    detail: "Mon - Sat 10 a.m. - 5 p.m.",
    icon: <IconSunHigh size={20} />,
  },
];

const contactInformationList = contactInformation.map((contact) => (
  <Group key={contact.title} noWrap>
    <ThemeIcon>{contact.icon}</ThemeIcon>
    <div>
      <Text sx={{ color: "var(--gray)", fontSize: 14 }}>{contact.title}</Text>
      <Text>{contact.detail}</Text>
    </div>
  </Group>
));

const ContactInformation = () => {
  return (
    <Stack p="xl">
      <Title order={3} mb={5}>
        Get in touch
      </Title>
      {contactInformationList}
    </Stack>
  );
};

export default ContactInformation;
