import   React                            from "react";
import { useState, useEffect, Component } from "react";
import   $                                from "jquery";
import   HeaderClass                      from "./components/Header/HeaderClass";

import
{
    Table, Container, Button,
    Modal, Form, Placeholder,
    Spinner
}
from "react-bootstrap";

import
{
    BsTrash, BsPencilSquare, BsArrowUp,
    BsArrowDown, BsArrowDownUp
}
from "react-icons/bs";

interface HomeProps {
    orderMateriaBy?: "asc" | "desc",
    orderTipoBy?: "asc" | "desc",
}

export default class HomeClass extends Component<HomeProps> {
    constructor(props: HomeProps) {
        super(props);

        this.state = {
            isResultAvailable: false,
            isEditing:         false,
            materiaToEdit:     "",
            newMateria:        "",
            newTipo:           "",
            isEditingLoading:  false,
            isDeleting:        false,
            materiaToDelete:   "",
            isDeletingLoading: false,
            result: {
                materia: "",
                tipo:    ""
            }
        };
    }

    componentDidMount(): void {
        switch (this.props.orderMateriaBy) {
            case "asc":
                this.getMateria("materia");
                break;
            case "desc":
                this.getMateria("materia_desc");
                break;
            default:
                switch (this.props.orderTipoBy) {
                    case "asc":
                        this.getMateria("tipo");
                        break;
                    case "desc":
                        this.getMateria("tipo_desc");
                        break;
                    default:
                        this.getMateria();
                }
        }
    }

    getMateria = (order_by?: string): void => {
        if (order_by) {
            $.ajax({
                url: `https://api-python-mxqq.onrender.com/?order_by=${order_by}`,
                type: "GET",
                success: (response) => {
                    this.setState({
                        isResultAvailable: true,
                        result: {
                            materia: response.materia,
                            tipo:    response.tipo
                        }
                    });
                }
            });
        } else {
            $.ajax({
                url: `https://api-python-mxqq.onrender.com/`,
                type: "GET",
                success: (response) => {
                    this.setState({
                        isResultAvailable: true,
                        result: {
                            materia: response.materia,
                            tipo:    response.tipo
                        }
                    });
                }
            });
        }
    }

    render(): JSX.Element {
        return (
            <>
                <HeaderClass />

                <Container>
                    <h1 className="mb-3">Matérias</h1>

                    <Table>
                        <thead>
                            <tr>
                                <th>Matéria</th>
                                <th>Tipo</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                    </Table>
                </Container>
            </>
        );
    }
}
