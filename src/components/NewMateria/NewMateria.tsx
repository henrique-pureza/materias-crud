import React, { useState }                  from "react";
import Header                               from "./../Header/Header";
import { Form, Container, Button, Spinner } from "react-bootstrap";
import $                                    from "jquery";

export default function NewMateria(): JSX.Element {
    const [materia,   SetMateria  ] = useState<string>  ();
    const [tipo,      SetTipo     ] = useState<string>  ();
    const [isSending, SetIsSending] = useState<boolean> (false);

    function GoBack(): void {
        window.location.href = "/materias-crud/";
    }

    function Submit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();

        $.ajax({
            url: "https://api-python-mxqq.onrender.com/create",
            type: "POST",

            data: JSON.stringify({
                materia: materia,
                tipo: tipo
            }),
            contentType: "application/json",
            dataType: "json",

            beforeSend() {
                SetIsSending(true);
            },
            success() {
                SetIsSending(false);
                GoBack();
            }
        });
    }

    return (
        <>
            <Header NewButtonHidden />
            <Container>
                <h1 className="mb-3">
                    Nova matéria
                </h1>
                <Form onSubmit={(event: React.FormEvent<HTMLFormElement>) => Submit(event)}>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Matéria
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Matéria"
                            value={materia}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => SetMateria(event.target.value)}
                            required
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Tipo
                        </Form.Label>
                        <Form.Select
                            className="mb-1"
                            value={tipo}
                            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => SetTipo(event.target.value)}
                            required
                        >
                            <option value="">
                                Selecione um tipo de matéria
                            </option>
                            <option value="Linguagem">
                                Linguagem
                            </option>
                            <option value="Ciência Humana">
                                Ciência Humana
                            </option>
                            <option value="Ciência Exata">
                                Ciência Exata
                            </option>
                            <option value="Itinerário Formativo">
                                Itinerário Formativo
                            </option>
                            <option value="Outros">
                                Outros
                            </option>
                        </Form.Select>
                        <Form.Text>
                            Tipo de matéria: se é uma ciência humana, exata ou linguagem.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Button
                            variant="secondary"
                            onClick={GoBack}
                            className="me-1"
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            className="me-3"
                        >
                            Criar
                        </Button>
                        {
                            isSending
                                ?
                                    <Form.Text>
                                        Criando...
                                        <Spinner
                                            animation="grow"
                                            size="sm"
                                            className="ms-2"
                                        />
                                    </Form.Text>
                                :
                                    null
                        }
                    </Form.Group>
                </Form>
            </Container>
        </>
    );
}
