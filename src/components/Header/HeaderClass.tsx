import { Component } from "react";
import { BsPlusLg }  from "react-icons/bs";
import {
    Container, Navbar, Button
} from "react-bootstrap";


interface HeaderProps {
    newButtonHidden?: boolean
}

export default class HeaderClass extends Component<HeaderProps> {
    constructor(props: HeaderProps) {
        super(props);
    }

    goToNewMateriaPage = (): void => {
        window.location.href = "/materias-crud/new";
    }

    render(): JSX.Element {
        return (
            <Navbar bg="light" className="mb-3">
                <Container>
                    <Navbar.Brand href="/materias-crud/">Matérias</Navbar.Brand>
                    {
                        !this.props.newButtonHidden &&
                            <div className="d-flex">
                                <Button
                                    variant="primary"
                                    onClick={this.goToNewMateriaPage}
                                >
                                    <BsPlusLg />
                                </Button>
                            </div>
                    }
                </Container>
            </Navbar>
        )
    }
}
