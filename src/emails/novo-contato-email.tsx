import { QualiFormData } from "@/classes/FormData";
import {
  Text,
  Heading,
  Container,
  Section,
  Body,
  Html,
} from "@react-email/components";
import * as React from "react";

export default function NovoContato(formData: QualiFormData) {
  return (
    <Html>
      <Body
        style={{
          backgroundColor: "#F6FDFF",
          fontFamily: "Poppins, sans-serif",
          color: "#1D4C5A",
          padding: "20px",
        }}
      >
        <Container>
          <Section>
            <Heading style={{ color: "#991871" }} as="h1">
              Olá, time da Quali Clínica Escola!
            </Heading>
            <Text>
              Recebemos uma nova mensagem através do formulário de contato do
              site.
            </Text>
            <Text>Segue abaixo os detalhes:</Text>
            <ul style={{ paddingLeft: "20px" }}>
              <li>
                <strong>Nome:</strong> {formData.name}
              </li>
              <li>
                <strong>Telefone:</strong> {formData.phone}
              </li>
              <li>
                <strong>Email:</strong> {formData.email}
              </li>
              <li>
                <strong>Mensagem:</strong> {formData.message}
              </li>
              <li>
                <strong>Curso de interesse:</strong> {formData.course}
              </li>
            </ul>
            <Text>
              Agradecemos pela preferência em utilizar nossos serviços!
            </Text>
            <Text>Atenciosamente,</Text>
          </Section>

          <Section style={{ textAlign: "center", marginTop: "40px" }}>
            <Text
              style={{
                margin: "8px 0",
                fontWeight: "600",
                fontSize: "16px",
                color: "#F66C0E",
                lineHeight: "24px",
              }}
            >
              Conpec - Consultoria, Projetos e Estudos em Computação
            </Text>
            <Text
              style={{
                margin: "4px 0",
                fontSize: "16px",
                color: "#64748B",
                lineHeight: "24px",
              }}
            >
              Tire suas ideias do papel com a Conpec
            </Text>

            <Text
              style={{
                margin: "8px 0",
                fontWeight: "600",
                fontSize: "14px",
                color: "#64748B",
                lineHeight: "20px",
              }}
            >
              R. Josué de Castro, 100 — Cidade Universitária, Campinas — SP, 13083-861
            </Text>
            <Text
              style={{
                margin: "4px 0",
                fontWeight: "600",
                fontSize: "14px",
                color: "#64748B",
                lineHeight: "20px",
              }}
            >
              contato@conpec.com.br • (19) 3521-3842
            </Text>
            <Text
              style={{
                margin: "4px 0",
                fontWeight: "600",
                fontSize: "14px",
                color: "#64748B",
                lineHeight: "20px",
              }}
            >suporte@conpec.com.br • (19) 3521-3842
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
