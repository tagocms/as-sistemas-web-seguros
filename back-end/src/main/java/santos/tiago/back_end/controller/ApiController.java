package santos.tiago.back_end.controller;

import jakarta.validation.Valid;
import org.jspecify.annotations.NonNull;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import santos.tiago.back_end.model.User;
import santos.tiago.back_end.repository.UserRepository;
import santos.tiago.back_end.service.UserService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class ApiController {

    private final UserRepository userRepository;
    private final UserService userService;

    public ApiController(UserRepository userRepository, UserService userService) {
        this.userRepository = userRepository;
        this.userService = userService;
    }

    @GetMapping("/usuarios")
    public ResponseEntity<List<List<String>>> getUsers() {
        List<List<String>> target = new ArrayList<>();
        userRepository.findAll().forEach(
                (user) -> target.add(
                        List.of(
                                user.getUsername(),
                                user.getRole().getDescription()
                        )
                )
        );
        return new ResponseEntity<>(target, HttpStatus.OK);
    }

    @GetMapping("/usuarios/{username}")
    public ResponseEntity<List<String>> getUser(@NonNull @PathVariable String username) {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Username not found.");
        }
        return new ResponseEntity<>(List.of(user.get().getUsername(), user.get().getRole().getDescription()), HttpStatus.OK);
    }

    @PostMapping("/usuarios")
    public ResponseEntity<String> createUser(@NonNull @Valid @RequestBody User user) {
        Optional<User> matchingUser = userRepository.findByUsername(user.getUsername());
        if (matchingUser.isPresent()) {
            throw new DuplicateKeyException("User already present in the database");
        }

        User newUser = this.userService.createUser(user);
        this.userRepository.create(newUser.getUsername(), newUser.getPassword(), newUser.getRole());
        return new ResponseEntity<>("Usuário criado.", HttpStatus.CREATED);
    }

    @PutMapping("/usuarios/{username}")
    public ResponseEntity<String> updateUser(@NonNull @PathVariable String username, @NonNull @Valid @RequestBody User user) {
        User userToUpdate = this.userService.createUser(user);
        this.userRepository.update(username, userToUpdate.getPassword(), userToUpdate.getRole());
        return new ResponseEntity<>("Usuário alterado.", HttpStatus.OK);
    }

    @DeleteMapping("/usuarios/{username}")
    public ResponseEntity<String> deleteUser(@NonNull @PathVariable String username) {
        this.userRepository.deleteById(username);
        return new ResponseEntity<>("Usuário deletado.", HttpStatus.NO_CONTENT);
    }
}
