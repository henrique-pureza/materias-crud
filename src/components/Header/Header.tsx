import { Container, Navbar, Button } from "react-bootstrap";
import { BsPlusLg }                  from "react-icons/bs";

interface HeaderProps {
    NewButtonHidden?: boolean
}

export default function Header(props: HeaderProps) {
    function RedirectToNewPage(): void {
        window.location.href = "/materias-crud/new";
    }

    return (
        <Navbar bg="light" className="mb-3">
            <Container>
                <Navbar.Brand href="/materias-crud/">Matérias</Navbar.Brand>
                {
                    !props.NewButtonHidden
                        ?
                            <div className="d-flex">
                                <Button
                                    variant="primary"
                                    onClick={RedirectToNewPage}
                                >
                                    <BsPlusLg />
                                </Button>
                            </div>
                        :
                            null
                }
            </Container>
        </Navbar>
    );
}
