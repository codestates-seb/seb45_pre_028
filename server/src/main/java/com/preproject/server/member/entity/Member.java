package com.preproject.server.member.entity;

import com.preproject.server.answer.entity.Answer;
import com.preproject.server.question.entity.Question;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long memberId;

    @Column(nullable = false,unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(nullable = false)
    private LocalDateTime modifiedAt = LocalDateTime.now();
    
    // 회원과 답변 양방향 관계 설정
    @OneToMany(mappedBy = "member")
    private List<Answer> answers = new ArrayList<>();

    // 답변과 멤버 양방향 관계 설정
    public void addAnswer(Answer answer) {
        answers.add(answer);
        if(answer.getMember() != this){
            answer.setMember(this);
        }
    }
}
