import Heading from './Heading.js';
import Section from './section.js';

export default function Page() {
  return (
    <Section>
      <Heading >主标题</Heading>
      <Section >
        <Heading >副标题</Heading>
        <Heading >副标题</Heading>
        <Heading >副标题</Heading>
        <Section >
          <Heading >子标题</Heading>
          <Heading >子标题</Heading>
          <Heading >子标题</Heading>
          <Section >
            <Heading >子子标题</Heading>
            <Heading >子子标题</Heading>
            <Heading >子子标题</Heading>
          </Section>
        </Section>
      </Section>
    </Section>
  );
}