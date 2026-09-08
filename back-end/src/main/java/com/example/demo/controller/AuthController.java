
package com.example.demo.controller;
import com.example.demo.service.TokenService;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletRequest;

@RestController
public class AuthController {

 @GetMapping("/login")
 public String login(@RequestParam String usuario) {
  return TokenService.gerarToken(usuario);
 }

 @GetMapping("/admin")
 public String admin(HttpServletRequest request) {
  String auth = request.getHeader("Authorization");
  if (auth == null || !auth.equals("Bearer TOKEN-ADMIN")) {
   return "403 - Acesso negado (ADMIN)";
  }
  return "Acesso ADMIN autorizado";
 }

 @GetMapping("/user")
 public String user(HttpServletRequest request) {
  String auth = request.getHeader("Authorization");
  if (auth == null) {
   return "403 - Acesso negado (USER)";
  }
  return "Acesso USER autorizado";
 }
}
