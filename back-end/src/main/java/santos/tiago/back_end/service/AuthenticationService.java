package santos.tiago.back_end.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
    private final JWTService jwtService;
    private final AuthenticationManager authenticationmanager;

    public AuthenticationService(JWTService jwtService, AuthenticationManager authenticationmanager) {
        this.jwtService = jwtService;
        this.authenticationmanager = authenticationmanager;
    }

    public String authenticate(Authentication authentication) {
        return jwtService.generateToken(authentication);
    }

    public String authenticate(String username, String password) {
        UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken(username, password);
        Authentication authentication = authenticationmanager.authenticate(authRequest);
        return jwtService.generateToken(authentication);
    }
}
