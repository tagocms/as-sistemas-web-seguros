package santos.tiago.back_end.controller;

import jakarta.validation.Valid;
import org.jspecify.annotations.NonNull;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import santos.tiago.back_end.model.User;
import santos.tiago.back_end.model.UserResponse;
import santos.tiago.back_end.model.UserRole;
import santos.tiago.back_end.repository.UserRepository;
import santos.tiago.back_end.service.UserService;

import java.util.ArrayList;
import java.util.Collection;
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
    public ResponseEntity<List<UserResponse>> getUsers(Authentication authentication) {
        Optional<User> currentUser = userRepository.findByUsername(authentication.getName());
        if (currentUser.isPresent() && currentUser.get().getRole() == UserRole.CLIENT) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized to read users.");
        }

        List<UserResponse> target = new ArrayList<>();
        userRepository.findAll().forEach(
                (user) -> target.add(
                        new UserResponse(user.getUsername(), user.getRole())
                )
        );
        return new ResponseEntity<>(target, HttpStatus.OK);
    }

    @GetMapping("/usuarios/{username}")
    public ResponseEntity<UserResponse> getUser(@NonNull @PathVariable String username, Authentication authentication) {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Username not found.");
        }

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        boolean containsAuthority = false;
        for(GrantedAuthority authority: authorities) {
            String decomposedAuthority = authority.getAuthority();
            if (decomposedAuthority != null) {
                if (decomposedAuthority.equals("read")) {
                    containsAuthority = true;
                }
            }
        }

        Optional<User> currentUser = userRepository.findByUsername(authentication.getName());
        boolean currentUserIsClient = currentUser.isPresent() && currentUser.get().getRole() == UserRole.CLIENT;

        if ((containsAuthority && !currentUserIsClient) || user.get().getUsername().equals(authentication.getName())) {
            return new ResponseEntity<>(new UserResponse(user.get().getUsername(), user.get().getRole()), HttpStatus.OK);
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized to read data from user.");
        }
    }

    @PostMapping("/usuarios")
    public ResponseEntity<String> createUser(@NonNull @Valid @RequestBody User user, Authentication authentication) {
        Optional<User> matchingUser = userRepository.findByUsername(user.getUsername());
        if (matchingUser.isPresent()) {
            throw new DuplicateKeyException("User already present in the database");
        }

        Optional<User> currentUser = userRepository.findByUsername(authentication.getName());
        if (currentUser.isPresent() && currentUser.get().getRole() != UserRole.ADMIN) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized to create users.");
        }

        User newUser = this.userService.createUser(user);
        this.userRepository.create(newUser.getUsername(), newUser.getPassword(), newUser.getRole());
        return new ResponseEntity<>("Usuário criado.", HttpStatus.CREATED);
    }

    @PutMapping("/usuarios/{username}")
    public ResponseEntity<String> updateUser(@NonNull @PathVariable String username, @NonNull @Valid @RequestBody User user, Authentication authentication) {
        Optional<User> userInRepository = userRepository.findByUsername(username);
        if (userInRepository.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Username not found.");
        }

        User userToUpdate = this.userService.createUser(user);

        Optional<User> optionalCurrentUser = userRepository.findByUsername(authentication.getName());
        if (optionalCurrentUser.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Current user not found.");
        }

        User currentUser = optionalCurrentUser.get();
        if (currentUser.getRole() == UserRole.CLIENT) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized to update users.");
        }
        if (currentUser.getRole() == UserRole.OPERATOR && (userToUpdate.getRole() == UserRole.ADMIN || userInRepository.get().getRole() == UserRole.ADMIN)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized to set role higher than self.");
        }

        this.userRepository.update(username, userToUpdate.getPassword(), userToUpdate.getRole());
        return new ResponseEntity<>("Usuário alterado.", HttpStatus.OK);
    }

    @DeleteMapping("/usuarios/{username}")
    public ResponseEntity<String> deleteUser(@NonNull @PathVariable String username, Authentication authentication) {
        Optional<User> currentUser = userRepository.findByUsername(authentication.getName());
        if (currentUser.isPresent() && currentUser.get().getRole() != UserRole.ADMIN) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized to delete users.");
        }

        this.userRepository.deleteById(username);
        return new ResponseEntity<>("Usuário deletado.", HttpStatus.NO_CONTENT);
    }
}
