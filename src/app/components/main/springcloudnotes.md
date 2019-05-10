## _The Cloud_ and All Its Hype
* Changing the way we build software
* Going from centralized to distributed
* Going from managed to finite resource to infinite resource

## New Challenges
* We must think differently; different architecture design and approach
* Resources like databases, servers, disks will grow and shrink, appear and disappear

### Spring Cloud helps us build cloud-native applications
* A cloud-native application is software that is specifically built for cloud computing
* Spring Cloud is not a framework; it is used to describe a number of projects that all fall under the same umbrella
    * Spring Cloud Config
    * Spring Cloud Cluster
    * Spring Cloud Consul
    * Spring Cloud Stream
    * Spring Cloud Netflix
    * Spring Cloud Sleuth
    * Spring Cloud Bus
    * And so many more...

## We will learn
* Service Discovery - How do we dynamically find our application's services at runtime in the cloud?
* Distributed Configuration - How to manage common or service specific configuration in a distributed system
* Intelligent Routing - How to make a distributed system look as if it were a single, cohesive system
* Client-Side Load Balancing - How we distribute load across several instances of the same service 
* Circuit Breaker - How to build fault tolerant applications in the cloud 

## What is Service Discovery and Why do we need it?
* The cloud is changing the way that we build software; we are moving from building these single, large applications and instead breaking them up into individually deployable/scalable services to which, as a whole, comprises the entire application
* How does one service locate another?
* Service Discovery provides
    * A way for a service to register itself; when a service comes online, it can communicate with the service discovery server and tell it it's location and port of the service, so that other application services can call it
    * A way for a service to deregister itself; if a service were to shutdown or go away temporarily, it would want to let the service discovery server know that its no longer available for clients to use
    * A way for clients to find other services; if one application service needs the functionality of another application service, it can locate the service discovery server 
    * A way to check the health of a service and remove unhealthy instances; each application service will implement a health endpoint, and the service discovery server would call that endpoint. If the health check were to fail, the service discovery server would remove that endpoint from its registry

## Discovering Services with Spring Cloud 
* There are actually many ways to discover services with Spring Cloud
    * Spring Cloud Consul
    * Spring Cloud Zookeeper
    * Spring Cloud Netflix

## Spring Cloud Netflix = Netflix OSS + Spring + Spring Boot
* Not actually a project in and of itself, rather it is a collection of projects
    * Spring Cloud Netflix Eureka Server
    * Spring Cloud Netflix Eureka Client
    * Other Spring Cloud Netflix Projects

## Key Components in Service Discovery
* Discovery Server
* Application Service 
* Application Client
* The general flow of Service Discovery:
    1. The application service starts up, registers its location, port, and service identifier with the discovery server
    2. The application client makes a request to the discovery server, sending along the service identifier. The discovery service knows, based on that service identifier, which service the client is asking for
    3. The discovery server responds back with the location and port of that service 
        * From here, things proceed as normal
    4. The application client can request the service at its location 
    5. The application service can respond with data

# The Discovery Server
* At its core, the discovery server is an actively managed registry of service locations
* Typically would run one or more instances, as it is the key component to locate other services. If you cant locate other services, you have no SOA
* The discovery server implementation within the Spring Cloud Eureka Server 
* In the pom.xml,
```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-eureka-server</artifactId>
    </dependency>
</dependencies>

<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>Camden.SR2</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```
* In the application.yml, define a new property
```yml
spring:
    application:
        name: discovery-server
server:
    port: 8761 # Default Port for Eureka Discovery Server

# In development mode, you want to include the following code
# In production mode, we would want our discovery server to be able to register itself with a peer discovery server for high availability
eureka:
    client:
        registerWithEureka: false # We are running in standalone mode, aka dev
        fetchRegistry: false # Whether this client should fetch the registry from the Eureka Server
```
* In the main application class, you define one annotation
```java
@SpringBootApplication
@EnableEurekaServer
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```
# The Application Service 
* The applciation service provides some application functionality
* The receiver of requests from clients, and returner of responses
* A dependency of other services
* User of the Discovery Client; makes calls out to the discovery server, and register/deregister itself
* In the pom.xml
```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-eureka</artifactId>
    </dependency>
</dependencies>

<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>Camden.SR2</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```
* In your application.yml,
```yml
spring:
    application:
        name: application-service
eureka:
    client:
        service-url:
            defaultZone: http://localhost:8761/eureka/
```
* In your main application class, simply add one annotation
```java
@SpringBootApplication
@EnableDiscoveryClient
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```
# The Application Client
* Calls another application service to implement its functionality 
* This guy is the issuer of requests
* Depends on other services
* Also is a user of the discovery client; to find service locations 
* In the pom.xml,
```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-eureka</artifactId>
    </dependency>
</dependencies>

<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>Camden.SR2</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```
* In the application.yml,
```yml
spring:
    application:
        name: client
eureka:
    client:
        service-url:
            defaultZone: http://localhost:8761/eureka
        register-with-eureka: false # Since we are a client, we do not need to be registered with Eureka. 
                                    # We don't need others to discover us; we need to discover others
```
* In our application class, we provide the same annotation as the Application Service
```java
@SpringBootApplication
@EnableDiscoveryClient
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```
* When discovering services as a client, we have two options
    1. We can inject the Eureka Client
    ```java
    @Autowired
    EurekaClient client;
    ```
    2. We can inject the (discovery server agnostic) Spring Discovery Client
    ```java
    @Autowired
    DiscoveryClient client;
    ```
### Using the EurekaClient
* We can call the ```getNextInstanceFromEureka``` method, which picks the next instance using round-robin
    * First argument is the virtual host name or service identifier of service to call
        * By default, apps use the ```spring.application.name``` as their virtual hostname when registering
    * Second argument is whether this is a secure request
```java
@Autowired
EurekaClient eurekaClient;

// Get a reference to a service instance
InstanceInfo instance = eurekaClient.getNextInstanceFromEureka("service-id", false);

// Get the base URL to use with our RestTemplate to call the service
String baseUrl = instance.getHomePageUrl();
```

### Using the Spring DiscoveryClient
* We can call the ```getInstances``` method, which returns all instances of the given service identifier
    * First argument is the virtual host name or service identifier of service to call
        * By default, apps use the ```spring.application.name``` as their virtual hostname when registering
```java
@Autowired
DiscoveryClient client;

// Get a list of instances matching the supplied service identifier
List<ServiceInstance> instances = client.getInstances("service-id");

// Get the base URL to use with our RestTemplate to call the service
String baseUrl = instances.get(0).getUri().toString();
```

## Configuring Spring Cloud Eureka
* Areas of Configuration
    1. eureka.server.*
    2. eureka.client.*
    3. eureka.instance.*
* Eureka Server Configuration 
    * Eureka Server - the discovery server; Contains a registry of services that can be discovered
    * All configurations under the _eureka.server_ prefix
* Eureka Client Configuration
    * Eureka Client - anything that can discover services
    * All configurations under the _eureka.client_ prefix
* Eureka Instance Configuration
    * Eureka Instance - anything that registers itself with the Eureka Server to be discovered by others
    * All configurations under the _eureka.instance_ prefix

## Spring Cloud Eureka: Health and High Availablity
* Are my services healthy?
    * Eureka server regularly checks the status of services 
    * Clients send heartbeats every 30 seconds (by default)
    * Services are removed after 90 seconds of no heartbeats (by default)
    * Can customize configuration to use '/health' endpoint, which comes with Spring Boot Actuator
        * ```eureka.client.healthcheck.enabled```
* High Availability
    * When a client requests a service location from the discovery server, the discovery server actually sends back a copy of the registry (cached locally on every client)
    * This way, if the service discovery server goes down, the clients can operate without the discovery server 
    * What happens if services deregister, or whatever? Clients fetch deltas from the discovery server to update the registry 

# Configuration: Non-Distributed vs Distributed
* In a non-distributed application, typically only have a handful of configuration files. Often a 1-1 relationship between a system and its configuration
* In a distributed system, that configuration goes to many, many configurations files..because we have many systems that make up one, single system as a whole
    * Each microservice that composes the application has a configuration
* Application Configuration Server is 
    * a dedicated, dynamic, centralized key/value store (may be distributed)
    * Authoritative source for all configuration
    * Provides support for auditing, versioning, and cryptography support 

# Spring Cloud Config
* Spring Cloud Config provides server and client-side support for externalized configuration in a distributed system 
* Integration with Spring Applications
    * Config Client 
        * Embedded in application
        * Fit's perfectly with Spring's ```Environment``` abstraction
    * Config Server
        * Typically standalone (can be embedded)
        * Fits perfectly with Spring's ```PropertySource``` abstraction

# Spring Cloud Config Server
* At it's core, Spring Cloud Config Server is just another web application 
    * Provides a REST based interface for accessing your configuration files 
    * Doesn't facilitate writing configuration files, only serving them 
    * Supports various output formats, default is JSON
* Backend Stores
    * Doesn't need a DB to store configuration files, instead has support for reading and retrieving configuration files from 
        * Git (Default)
        * Filesystem
* Configuration Scopes - you can define global configuration, as well as application specific config and Spring profile configuration
* In the pom.xml
```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-config-server</artifactId>
    </dependency>
</dependencies>

<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>Edgware.RELEASE</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```
* Next, create a folder to store configuration files that you want your config server to serve up
    * In that folder, you can optionally create an application.yml file that serves as configuration for all applications
    * In that folder, you add an application-profile.yml file that serves as configuration for an application for the specified profile
* Next, run 
```
git init
git add .
git commit -m "Configuration"
git push origin master
```

## Using the Spring Cloud Config Server
* In the Config Server's application.yml,
```yml
server:
    port: 8888 # Isn't required, but is the conventional port for the Config Server
spring:
    cloud:
        config:
            server:
                git:
                    uri: <uri_to_git_repo> # Repo that holds all of the configuration files

# Add the following to make the Config Server discoverable by Eureka!
eureka:
    client:
        service-url:
            defaultZone: http://localhost:8761/eureka
```
* In the application class,
```java
@SpringBootApplication
@EnableConfigServer
@EnableDiscoveryClient /* Optional, use if you want Config Server to be discoverable by Eureka */
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

## Don't forget to secure your Config Server!
* Easy to secure with Spring Security

## Spring Cloud Config Server: REST Endpoints
* REST Endpoint Parameters
    * {application} maps to ```spring.application.name``` on client
    * {profile} maps to ```spring.profiles.active``` on client 
    * {label} server side feature to refer to a set of configuration files by name (for Git backend, this refers to branch name)

* REST Endpoints 
    * GET /{application}/{profile}[/{label}]
        * /myapp/dev/master
        * /myapp/prod/v2
        * /myapp/default
    * GET /{application}-{properties}.(yml | properties)
        * /myapp-dev.yml
        * /myapp-prod.properties
        * /myapp-default.properties
    * GET /{label}/{application}-{profile}.(yml | properties)
        * /master/myapp-dev.yml
        * /v2/myapp-prod.properties
        * /master/myapp-default.properties

# Spring Cloud Config Client
* Responsible for bootstrapping and fetching application configuration

## Fetching Configuration: Application Startup
* When a Spring application starts up, it needs to resolve it's property sources very early on in the startup process 
* The Config Client needs to fetch the configuration details from the Config Server before the ```ApplicationContext``` has finished loading 
* We bootstrap our application in either a ```bootstrap.properties``` or ```bootstrap.yml```, in one of two ways
    1. Config First: Specify the location of the config server 
        * Specify the ```spring.application.name``` and ```spring.cloud.config.uri``` properties
    2. Discovery First: Discover the location of the config server (this uses Service Discovery)
        * Specify the ```spring.application.name``` and ```spring.cloud.config.discovery.enabled``` properties
* Setting up the Spring Cloud Config Client, in pom.xml
```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-config-client</artifactId>
    </dependency>
</dependencies>

<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>Edgware.RELEASE</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
<dependencyManagement>
```
* In the application class,
```java
@SpringBootApplication
@EnableDiscoveryClient
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

## Updating Configuration Files at Runtime
1. Configuration Changes
```
git add .
git commit -m "Updated Configuration Files"
git push origin master
```
2. Notify Applications to Refresh Configuration 
    * Hit the /refresh endpoint in ```spring-boot-starter-actuator``` (explicit, must be done for every application that needs the new configuration)
    * Hit the /bus/refresh
    * /monitor with Spring Cloud Config Monitor
3. Celebrate, yeah wassup colleagues, configurations updated at runtime!

## Utilizing @RefreshScope
* If we hit the /refresh or /bus/refresh, the only configurations that will get updated include ```@ConfigurationProperties```, or logging levels 
    * Any ```@Bean``` or ```@Value``` only gets set at initialization
* To be able to change the value of ```@Bean``` or ```@Value```, 
    1. Simply add the ```@RefreshScope``` annotation to the ```@Bean``` 
    2. Hit the /refresh endpoint
    3. The ```@Bean``` will be reinitialized with the updated configuration values 

## Encrypting and Decrypting Configuration 
* Support for encrypted configuration at rest or in flight
    * At rest - when the configuration is sitting on disk 
    * In flight - when the configuration is being fetched from the config server to the config client 
* /encrypt and /decrypt endpoints 
* Supports encryption/decryption with symmetric/asymmetric keys 
* At what point is the configuration decrypted?
    1. Upon request at the config server (default)
    2. Locally at the client on response, client is responsible for decrypting the encrypted response
        * Configure on the Config Server: ```spring.cloud.config.server.encrypt.enabled=false```

# Intelligent Routing via a Gateway Service (API Gateway)
* A single point of entry for all clients
* The front door, edge service, to services
* A Gateway Service provides
    * Dynamic Routing and Delivery
    * Security and Filtering, authenticate all incoming requests
    * Auditing and Logging of requests, since all requests must enter the gateway 
    * Request Enhancement - add additional information to requests
    * Load balancer for individual services behind it 
    * Different API's for different clients 

## Intelligent Routing with Spring Cloud and Netflix Zuul
* Zuul is a gateway service that provides dynamic routing, monitoring, resilency, security, and more 
* To use Netflix Zuul, in the pom.xml
```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-zuul</artifactId>
    </dependency>
</dependencies>

<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>Edgware.RELEASE</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```
* In the application class,
```java
@SpringBootApplication
@EnableZuulProxy
@EnableDiscoveryClient /* Necessary if using Service Discovery */
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

## Using Spring Cloud and Netlix Zuul with Service Discovery
* If you are using Service Discovery
    1. ```spring.application.name```
    2. ```eureka.client.service-url.defaultZone```
* If you arent using Service Discovery
    1. ```spring.application.name```
    2. ```ribbon.eureka.enabled```=false

## Configuring Routes with Spring Cloud and Netflix Zuul
* Default route to service resolution with Service discovery
    * If we make a request to /foo, Zuul will map the request to an application that has ```spring.application.name``` equal to foo
* Precise Routing with Service Discovery
```yml
spring:
    application:
        name: gateway-service
zuul:
    routes:
        <route_name>:
            path: /somepath/**
            serviceId: some_service_id # The name of another service that Zuul will look for when using service discovery
        ignored-services: another_service_id
```

## Creating Fliters with Spring Cloud and Netflix Zuul
* Filters allow you to intercept and control requests and responses 
* Netflix Zuul has support for multiple types of filters
    1. Pre - executed before the request is routed
    2. Route - allows you to direct the request anywhere you'd want 
    3. Post - executed after the request is routed 
    4. Error - responsible for handling request errors
* To create one of the previous filters,
```java
public class MyFilter extends ZuulFilter {
     
    @Override
    public Object run() {
        // Filter logic goes here
    }

    @Override
    public boolean shouldFilter() {
        // Whether or not the run() method should run
    }

    @Override
    public String filterType() {
        // The type of filter: pre, route, post, error
    }

    @Override 
    public int filterOrder() {
        // The order of execution with respect to other filters of the same type
    }
}
```

## Sharing Between Filters: ```RequestContext```
* The ```RequestContext``` object holds request, response, state, and data information that needs to be shared between filters
* Only available for the duration of the request 
```java
RequestContext ctx = RequestContext.getCurrentContext();

// Get the servlet request
HttpServletRequest request = ctx.getRequest();

// Get the servlet response
HttpServletResponse response = ctx.getResponse();

// Set a variable
ctx.set("foobar", "PRE_FILTER_EXECUTED");

// Get a variable
String foobar = (String) ctx.get("foobar");
```

## Creating a Filter
* Define a ```@Bean``` which returns the filter 
```java
@Configuration
public class MyConfig {

    @Bean
    public ZuulFilter myFilter() {
        return new MyFilter();
    }
}
```

# What is Load Balancing?
* Improves the distribution of workloads across multiple computing resources
* But, what role does load balancing play in a cloud-native architecture?
    * Traditional applications have multiple instances of the same application
    * Cloud native applications have multiple instances of the different services, with multiple load balancers

## Different Type of Load Balancing
| Server Side | Client Side | 
| ----------- | ----------- | 
| Server Distributes Request | Client Distributes Request | 
| Hardware or Software Based | Software Based | 
| Extra hop, request has to go through intermediary first | No extra hop, since we know the location of the services | 
| Various balancing algorithms support | Various balancing algorithms support | 
| Occurs outside the request process | Occurs within the request process | 
| Centralized or distributed | Typically distributed | 
* Client side load balancing is a natural fit for cloud native applications

## Client Side Load Balancing with Spring Cloud 
* Netflix Ribbon - inter process communication (remote procedure calls) library with built in client side load balancers 
    * Full integration with Spring's ```RestTemplate```

## Using Spring Cloud and Netflix Ribbon
* In the pom.xml,
```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-ribbon</artifactId>
    </dependency>
</dependencies>

<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>Edgware.RELEASE</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```
* Two new annotations
    * ```@LoadBalanced``` marks a ```RestTemplate``` to support load balancing
    * ```@RibbonClient``` is used for custom configuration and when Service Discovery is absent 

## Creating a Load Balanced ```RestTemplate```
```java
@Configuration
public class MyConfiguration {

    @Bean
    @LoadBalanced
    public RestTempate restTemplate() {
        return new RestTemplate();
    }
}
```

## Using a LoadBalanced ```RestTemplate``` with Service Discovery
* Suppose ```my-service``` is the name of a service running on port 9000 at mycompany.com and is discoverable via Service Discovery. There are two instances running
* **Instead of** doing something like this 
```java
restTemplate.getForEntity("http://mycompany.com:9000/u/1", ...);

restTemplate.getForEntity("http://128.168.10.10:9000/u/1", ...);
```
* We can use ```RestTemplate``` like this 
```java
restTemplate.getForEntity("http://my-service/u/1", ...); /* Same identifier as spring.application.name */
```

## In a distributed system, one thing is absolutely certain...
* Failure is inevitable
* Hardwork, networks, and software can all fail 
* The chance of this happening in a distributed system becomes multiplied compared to that of a centralized system 
* Process communication is now more likely to fail
    * Centralized system - within the process
    * Distributed system - across the network 

## Cascading Failure 
* A failure in a system of interconnected parts in which the failure of that part can trigger the failure of successive parts 
* Multiple issues at play 
    * Fault tolerance problem
    * Resource overloading problem 

## Embracing Failure with the Circuit Breaker Pattern 
* a design pattern in modern software development used to detect failures and encapsulate logic of preventing failures to reoccur constantly
* A circuit breaker is a switch that prevents too much current from flowing through a circuit
    * If too much current flows through a circuit, it could cause damage or even start a fire 
    * What the circuit breaker does is prevent that from happening by opening the circuit when it detects that there is too much current flowing through it
    * When a circuit is open, it prevents any further current from flowing through it 

## Fault Tolerance with Netflix Hystrix and Spring Cloud 
* Hystrix is a latency and fault tolerance library designed to stop cascading failure and enable resilence in complex distributed systems where failure is inevitable
* Implements the circuit breaker pattern
    * Wraps calls and watches for failures 
    * A circuit will be tripped if, within a 10 sec rolling window (by default)
        * 20 request volume (default) fails at a 50% or greater (default) rate
    * Hystrix will periodically recheck if the service should be closed, waits and tries a single request after 5 seconds (default)
        * If it succeeds, the circuit will be closed
        * Else, it will stay open
    * Any request that are short circuited, or timed out, or failed, or rejected will be given a chance to execute what is called a _fallback_ method 
        * Might be something like returning cached data or an empty response 
* Hystrix also protects services from being overloaded 
    * All Hystrix wrapped calls are bounded either by a thread pool or a semaphore. What this does is constrain the resource usage so that requests don't stack up and consume the valuable resources 
    * If a request fails, the fallback method will be called 

## Using Spring Cloud and Netflix Hystrix
* In the pom.xml,
```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-hystrix</artifactId>
    </dependency>

    <!-- If you want to consume metrics as well -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-actuator</artifactId>
    </dependency>
</dependencies>

<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>Edgware.RELEASE</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```
* In the main application class,
```java
@SpringBootApplication
@EnableCircuitBreaker
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```
* In your ```@Service``` or ```@Component``` class, locate the method that you want to wrap with Hystrix, and annotate that method with ```@HystrixCommand```
    * On that ```@HystrixCommand``` annotation, define an attribute _fallbackMethod_ and set that equal to the name of the method you want to fall back to in the event of a failure
```java
@Service
public class MyService {

    @HystrixCommand(fallbackMethod = "somethingElse")
    public void doSomething() {
        /* ... */
    }

    public void somethingElse() {
        /* ... */
    }
}
```

## Hystrix Metrics in Real Time with Hystrix Dashboard
* Web application that tracks metrics such as 
    * state of the circuit (open or closed, error rate, traffic volume, successful requests, rejected requests, timeouts, latency percentiles)
    * monitor protected calls for a single server or a cluster of servers

## Using Spring Cloud and the Hystrix Dashboard
* In the pom.xml,
```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-hystrix-dashboard</artifactId>
    </dependency>
</dependencies>

<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>Edgware.RELEASE</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```
* In the application class,
```java
@SpringBootApplication
@EnableHystrixDashboard
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, run);
    }
}
```

## Aggregating Hystrix Streams with Turbine
* Turbine is a tool for aggregating streams of Server-Sent Event (SSE) JSON data into a single stream
    * Allows for multiple Hystrix Streams in one view on the Hystrix Dashboard

## Using Spring Cloud and Netflix Turbine
* In the pom.xml,
```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-turbine</artifactId>
    </dependency>
</dependencies>

<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>Edgware.RELEASE</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```
* In the application class,
```java
@SpringBootApplication
@EnableTurbine
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, run);
    }
}
```
* In the application.yml,
```yml
turbine:
    appConfig: <list_of_service_ids>
    clusterNameExpression: "'default'" # Group of services that need to be monitored together
# Also add spring.name.application and discovery server location
```