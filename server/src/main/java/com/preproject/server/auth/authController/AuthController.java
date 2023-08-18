package com.preproject.server.auth.authController;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AuthController {
    @GetMapping("/oauth2")
    public String oauth2() {
        return "oauth2";
    }
}
