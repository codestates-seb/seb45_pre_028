package com.preproject.server.answer.repository;

import com.preproject.server.answer.entity.Answer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AnswerRepository extends JpaRepository <Answer, Long> {

}
