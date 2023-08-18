package com.preproject.server.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class MemberResponseDto {
    private long memberId;
    private String email;
    private String name;

    /**
     *  questionCount, answerCount 필드 추가 @Setter 추가
     */
    private long questionCount;
    private long answerCount;


    //    // 바디에 비밀번호가 포함될 필요는 없다고 해서 일단 주석처리!
//    private String password;
}
