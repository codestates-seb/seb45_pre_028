package com.preproject.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class ServerApplication extends SpringBootServletInitializer {

	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
	}

	// 톰캣 어플리케이션 실행을 위한 configure Override
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
		return builder.sources(ServerApplication.class);
	}

}
