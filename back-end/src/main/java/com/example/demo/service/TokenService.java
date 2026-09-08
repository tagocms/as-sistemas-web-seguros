
package com.example.demo.service;
public class TokenService {

 public static String gerarToken(String usuario) {
  return "TOKEN-" + usuario.toUpperCase();
 }

 public static boolean validar(String token, String role) {
  return token.equals("TOKEN-" + role.toUpperCase());
 }
}
