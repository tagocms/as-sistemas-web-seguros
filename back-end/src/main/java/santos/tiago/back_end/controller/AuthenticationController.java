package santos.tiago.back_end.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.jspecify.annotations.NonNull;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import santos.tiago.back_end.model.User;
import santos.tiago.back_end.model.UserRole;
import santos.tiago.back_end.repository.UserRepository;
import santos.tiago.back_end.service.AuthenticationService;
import santos.tiago.back_end.service.UserService;

import java.util.Optional;

@RestController
public class AuthenticationController {
    private final AuthenticationService authenticationService;
    private final UserService userService;
    private final UserRepository userRepository;

    public AuthenticationController(
            AuthenticationService authenticationService,
            UserService userService,
            UserRepository userRepository
    ) {
        this.authenticationService = authenticationService;
        this.userService = userService;
        this.userRepository = userRepository;
    }

    @PostMapping("/autenticar")
    public String authenticate(Authentication authentication) {
        return authenticationService.authenticate(authentication);
    }

    @PostMapping("/cadastro")
    public String signUp(@NonNull @Valid @RequestBody User user) {
        Optional<User> matchingUser = userRepository.findByUsername(user.getUsername());
        if (matchingUser.isPresent()) {
            throw new DuplicateKeyException("User already present in the database");
        }

        String cleanPassword = user.getPassword();
        User newUser = userService.createUser(user);
        userRepository.create(newUser.getUsername(), newUser.getPassword(), UserRole.CLIENT);

        return authenticationService.authenticate(user.getUsername(), cleanPassword);
    }
}
