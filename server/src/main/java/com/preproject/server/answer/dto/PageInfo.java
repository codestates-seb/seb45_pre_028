package com.preproject.server.answer.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor // pageInfo 필드 값을 갖는 생성자 생성
public class PageInfo {
    private int page; // 페이지 번호
    private int size; // 페이지 개수(low)
    private int totalElements; // 테이블에 저장되어 있는 데이터의 총 개수
    private int totalPages; // 총 페이지 수
}
