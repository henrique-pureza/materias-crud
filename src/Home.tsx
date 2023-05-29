import   React                 from "react";
import { useState, useEffect } from "react";
import   $                     from "jquery";
import   Header                from "./components/Header/Header";
import   TablePlaceholder      from "./components/TablePlaceholder/TablePlaceholder";

import {
  Table, Container,
  Button, Modal, Form,
  Spinner
} from "react-bootstrap";

import {
  BsTrash, BsPencilSquare,
  BsArrowUp, BsArrowDown,
  BsArrowDownUp
} from "react-icons/bs";

interface HomeProps {
  materiaOrderDesc  ? : boolean,
  tipoOrderDesc     ? : boolean,
  materiaOrderAsc   ? : boolean,
  tipoOrderAsc      ? : boolean,
}

export default function Home(props: HomeProps): JSX.Element {
  const [ isResultAvailable, SetIsResultAvailable ] = useState<boolean>                           (false);
  const [ result,            SetResult            ] = useState<{materia: string, tipo: string}[]> ();
  const [ isEditing,         SetIsEditing         ] = useState<boolean>                           (false);
  const [ materiaToEdit,     SetMateriaToEdit     ] = useState<string>                            ("");
  const [ newMateria,        SetNewMateria        ] = useState<string>                            ("");
  const [ newTipo,           SetNewTipo           ] = useState<string>                            ("");
  const [ isEditingLoading,  SetIsEditingLoading  ] = useState<boolean>                           (false);
  const [ isDeleting,        SetIsDeleting        ] = useState<boolean>                           (false);
  const [ materiaToDelete,   SetMateriaToDelete   ] = useState<string>                            ("");
  const [ isDeletingLoading, SetIsDeletingLoading ] = useState<boolean>                           (false);

  function OpenEditModal(materia: string, tipo: string): void {
    SetIsEditing(true);
    SetMateriaToEdit(materia);
    SetNewMateria(materia);
    SetNewTipo(tipo)
  }

  function CloseEditModal(): void {
    SetIsEditing(false);
  }

  function OpenDeleteModal(materia: string): void {
    SetIsDeleting(true);
    SetMateriaToDelete(materia);
  }

  function CloseDeleteModal(): void {
    SetIsDeleting(false);
  }

  function EditMateria(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    $.ajax({
      url: "https://api-python-mxqq.onrender.com/update",
      type: "PUT",

      data: JSON.stringify({
        materiaToUpdate: materiaToEdit,
        newMateria: newMateria,
        newTipo: newTipo
      }),
      contentType: "application/json",
      dataType: "json",

      beforeSend() {
        SetIsEditingLoading(true);
      },

      success() {
        SetIsEditingLoading(false);
        CloseEditModal();
        window.location.reload();
      }
    });
  }

  function DeleteMateria(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    $.ajax({
      url: `https://api-python-mxqq.onrender.com/delete/${materiaToDelete}`,
      type: "DELETE",

      beforeSend() {
        SetIsDeletingLoading(true);
      },

      success() {
        SetIsDeletingLoading(false);
        CloseDeleteModal();
        window.location.reload();
      }
    });
  }

  function GetMateria(order_by?: string): void {
    if (order_by) {
      $.ajax({
        url: `https://api-python-mxqq.onrender.com/?order_by=${order_by}`,
        type: "GET",
        success(result) {
          SetIsResultAvailable(true);
          SetResult(result);
        }
      });
    } else {
      $.ajax({
        url: "https://api-python-mxqq.onrender.com/",
        type: "GET",
        success(result) {
          SetIsResultAvailable(true);
          SetResult(result);
        }
      });
    }
  }

  useEffect(() => {
    if (props.materiaOrderDesc) {
      GetMateria("materia_desc");
    } else if (props.tipoOrderDesc) {
      GetMateria("tipo_desc");
    } else if (props.materiaOrderAsc) {
      GetMateria("materia");
    } else if (props.tipoOrderAsc) {
      GetMateria("tipo");
    } else {
      GetMateria();
    }
  }, [
    props.materiaOrderDesc,
    props.tipoOrderDesc,
    props.materiaOrderAsc,
    props.tipoOrderAsc
  ]);

  return (
    <>
      <Header />

      <Container>
        <h1 className="mb-3">Matérias</h1>

        <Table>
          <thead>
            <tr>
              <th>
                {
                  props.materiaOrderDesc
                    ?
                      <a
                        href="/materias-crud/"
                        style={{ color: "#000", textDecoration: "none" }}
                      >
                        <span className="me-1">
                          Matéria
                        </span>
                        <BsArrowDown />
                      </a>
                    :
                      props.materiaOrderAsc
                        ?
                          <a
                            href="/materias-crud/materia-desc"
                            style={{ color: "#000", textDecoration: "none" }}
                          >
                            <span className="me-1">
                              Matéria
                            </span>
                            <BsArrowUp />
                          </a>
                        :
                          <a
                            href="/materias-crud/materia-asc"
                            style={{ color: "#000", textDecoration: "none" }}
                          >
                            <span className="me-1">
                              Matéria
                            </span>
                            <BsArrowDownUp />
                          </a>
                }
              </th>
              <th>
                {
                  props.tipoOrderDesc
                    ?
                      <a
                        href="/materias-crud/"
                        style={{ color: "#000", textDecoration: "none" }}
                      >
                        <span className="me-1">
                          Tipo
                        </span>
                        <BsArrowDown />
                      </a>
                    :
                      props.tipoOrderAsc
                        ?
                          <a
                            href="/materias-crud/tipo-desc"
                            style={{ color: "#000", textDecoration: "none" }}
                          >
                            <span className="me-1">
                              Tipo
                            </span>
                            <BsArrowUp />
                          </a>
                        :
                          <a
                            href="/materias-crud/tipo-asc"
                            style={{ color: "#000", textDecoration: "none" }}
                          >
                            <span className="me-1">
                              Tipo
                            </span>
                            <BsArrowDownUp />
                          </a>
                }
              </th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {
              isResultAvailable
                ?
                  result?.map((result: {materia: string, tipo: string}, id: number) => (
                    <tr key={id}>
                      <td>{result.materia}</td>
                      <td>{result.tipo}</td>
                      <td>
                        <Button
                          variant="primary"
                          className="me-1"
                          onClick={() => OpenEditModal(result.materia, result.tipo)}
                        >
                          <BsPencilSquare />
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => OpenDeleteModal(result.materia)}
                        >
                          <BsTrash />
                        </Button>
                      </td>
                    </tr>
                  ))
                :
                  <TablePlaceholder />
            }
          </tbody>
        </Table>
      </Container>

      <Modal show={isEditing} onHide={() => CloseEditModal()}>
        <Form onSubmit={(event: React.FormEvent<HTMLFormElement>) => EditMateria(event)}>
          <Modal.Header closeButton>
            <Modal.Title>
              Editar "{materiaToEdit}"
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>
                Nova matéria
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Nova matéria"
                value={newMateria}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => SetNewMateria(event.target.value)}
                required
                autoFocus
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>
                Novo tipo
              </Form.Label>
              <Form.Select
                className="mb-1"
                value={newTipo}
                onChange={(event: React.ChangeEvent<HTMLSelectElement>) => SetNewTipo(event.target.value)}
                required
              >
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
          </Modal.Body>
          <Modal.Footer className="position-relative">
            {
              isEditingLoading &&
                <Form.Text
                  className="position-absolute"
                  style={{ left: "1rem" }}
                >
                  Editando...
                  <Spinner
                    animation="grow"
                    size="sm"
                    className="ms-2"
                  />
                </Form.Text>
            }
            <Button
              variant="secondary"
              onClick={() => CloseEditModal()}
              className="me-1"
            >Cancelar</Button>
            <Button
              type="submit"
              variant="primary"
            >Editar</Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal show={isDeleting} onHide={() => CloseDeleteModal()}>
        <Form onSubmit={(event: React.FormEvent<HTMLFormElement>) => DeleteMateria(event)}>
          <Modal.Header closeButton>
            <Modal.Title>
              Deletar "{materiaToDelete}"
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Tem certeza de que deseja deletar a matéria "{materiaToDelete}"?
          </Modal.Body>
          <Modal.Footer className="position-relative">
            {
              isDeletingLoading &&
                <Form.Text className="position-absolute" style={{ left: "1rem" }}>
                  Deletando...
                  <Spinner
                    animation="grow"
                    size="sm"
                    className="ms-2"
                  />
                </Form.Text>
            }
            <Button
              variant="secondary"
              className="me-1 ms-1"
              onClick={() => CloseDeleteModal()}
            >Cancelar</Button>
            <Button
              variant="danger"
              type="submit"
            >Deletar</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
