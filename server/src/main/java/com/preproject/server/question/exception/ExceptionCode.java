package com.preproject.server.question.exception;

import lombok.Getter;

public enum ExceptionCode {
    CONNOT_READ_QUESTION(403, "Question can not read"),
    CONNOT_CHANGE_QUESTION(403, "Question can not change"),
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
