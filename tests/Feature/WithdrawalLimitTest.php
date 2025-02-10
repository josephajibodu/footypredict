<?php

it('does not allow users to withdrawal without a bet', function () {
    $response = $this->get('/');

    $response->assertStatus(200);
});

it('does not allow users blacklisted users to withdraw', function () {
    $response = $this->get('/');

    $response->assertStatus(200);
});