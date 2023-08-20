package com.preproject.server.answer.exception;

import lombok.Getter;

public enum ExceptionCode {
    CONNOT_READ_ANSWER(403, "Answer can not read"),
    CONNOT_CHANGE_ANSWER(403, "Answer can not change"),
    ANSWER_NOT_FOUND(404, "Answer not found"),

    QUESTION_NOT_FOUND(404, "Question not found");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int status, String message){
        this.status = status;
        this.message = message;
    }
}
