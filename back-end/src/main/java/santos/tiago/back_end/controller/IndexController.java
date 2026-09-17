package santos.tiago.back_end.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class IndexController {
    @GetMapping("/")
    public String index() {
        return """
            Realize cadastro com as seguintes rotas:
            - /cadastro
            - /autenticar
            
            Depois, use as rotas a seguir para utilizar a aplicação:
            - /api/usuarios (GET/POST)
            - /api/usuarios/{username} (PUT/DELETE)
            """;
    }
}
