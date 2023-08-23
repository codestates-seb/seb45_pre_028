package com.preproject.server.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404,"MEMBER NOT FOUND"),
    MEMBER_EXISTS(409,"MEMBER EXISTS"),

    CONNOT_READ_ANSWER(403, "Answer can not read"),
    CONNOT_CHANGE_ANSWER(403, "Answer can not change"),
    ANSWER_NOT_FOUND(404, "Answer not found"),

    CONNOT_READ_QUESTION(403, "Question can not read"),
    CONNOT_CHANGE_QUESTION(403, "Question can not change"),
    QUESTION_NOT_FOUND(404, "Question not found"),

    ACCESS_DENIED(400, "No permission");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
