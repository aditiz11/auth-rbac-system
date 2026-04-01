package com.authentication.auth_system.service;

import com.authentication.auth_system.dto.LoginRequest;
import com.authentication.auth_system.dto.RegisterRequest;
import com.authentication.auth_system.entity.Role;
import com.authentication.auth_system.entity.User;
import com.authentication.auth_system.repository.UserRepository;
import com.authentication.auth_system.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public void register(RegisterRequest request) {
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.valueOf(request.getRole()));

        userRepository.save(user);
    }

    public Map<String, String> login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail()). orElseThrow();

        if(!passwordEncoder.matches(request.getPassword(), user.getPassword())){
            throw new RuntimeException("Invalid credentials");
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
         Map<String, String> response = new HashMap<>();
         response.put("token", token);
         response.put("role", user.getRole().name());
        return  response;
    }
}
